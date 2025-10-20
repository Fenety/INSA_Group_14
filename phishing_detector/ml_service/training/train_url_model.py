import os
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from sklearn.model_selection import train_test_split
from sklearn.utils import class_weight
from sklearn.metrics import precision_recall_fscore_support, roc_auc_score
from utils import load_dataset  # your helper to load urls.csv

# ---- Config ----
DATA_PATH = "data/urls.csv"
CHAR_INDEX_PATH = "models/url_char_index.json"
SAVED_MODEL_DIR = "models/url_saved_model"
H5_PATH = "models/url_model.h5"
MAXLEN = 200  # longer sequences to capture full URLs
EMBED_DIM = 128
BATCH_SIZE = 64
EPOCHS = 15
SEED = 42

os.makedirs("models", exist_ok=True)

# ---- Build char index ------------------------------------------------------
X_texts, y = load_dataset(DATA_PATH)

# char_index build function (if not using external utils)
def build_char_index(texts):
    chars = sorted(list(set("".join(texts))))
    return {c: i+1 for i, c in enumerate(chars)}  # 0 reserved for padding

if os.path.exists(CHAR_INDEX_PATH):
    print("Loading existing char index...")
    with open(CHAR_INDEX_PATH, "r", encoding="utf-8") as f:
        char_index = json.load(f)
else:
    print("Building char index...")
    char_index = build_char_index(X_texts)
    with open(CHAR_INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(char_index, f, indent=2)

print(f"Char vocab size: {len(char_index)}")

# ---- Convert texts to sequences --------------------------------------------
def texts_to_sequences(texts, char_index, maxlen=MAXLEN):
    unk_id = len(char_index) + 1
    seqs = [[char_index.get(c, unk_id) for c in t[:maxlen]] for t in texts]
    return tf.keras.preprocessing.sequence.pad_sequences(seqs, maxlen=maxlen, padding="post", truncating="post")

X = texts_to_sequences(X_texts, char_index, MAXLEN)

# ---- Train/test split -------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.12, random_state=SEED, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.12, random_state=SEED, stratify=y_train)

# ---- tf.data pipelines ------------------------------------------------------
def make_dataset(X_arr, y_arr, batch_size=BATCH_SIZE, shuffle=False):
    ds = tf.data.Dataset.from_tensor_slices((X_arr, y_arr))
    if shuffle:
        ds = ds.shuffle(len(X_arr), seed=SEED)
    return ds.batch(batch_size).prefetch(tf.data.AUTOTUNE)

train_ds = make_dataset(X_train, y_train, shuffle=True)
val_ds = make_dataset(X_val, y_val)
test_ds = make_dataset(X_test, y_test)

# ---- Model ------------------------------------------------------------------
vocab_size = len(char_index) + 2
inputs = layers.Input(shape=(MAXLEN,), dtype="int32")
x = layers.Embedding(input_dim=vocab_size, output_dim=EMBED_DIM, input_length=MAXLEN)(inputs)
x = layers.Conv1D(128, 3, activation="relu", padding="same")(x)
x = layers.MaxPooling1D(2)(x)
x = layers.Conv1D(128, 5, activation="relu", padding="same")(x)
x = layers.MaxPooling1D(2)(x)
x = layers.Bidirectional(layers.LSTM(128, dropout=0.2, recurrent_dropout=0.0))(x)
x = layers.LayerNormalization()(x)
x = layers.Dropout(0.4)(x)
x = layers.Dense(64, activation="relu")(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(1, activation="sigmoid")(x)

model = models.Model(inputs, outputs)
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=[tf.keras.metrics.AUC(name="auc"), "accuracy"])
model.summary()

# ---- Callbacks --------------------------------------------------------------
cb_list = [
    callbacks.ModelCheckpoint(H5_PATH, monitor="val_auc", save_best_only=True, verbose=1),
    callbacks.EarlyStopping(monitor="val_auc", patience=4, restore_best_weights=True, verbose=1),
    callbacks.ReduceLROnPlateau(monitor="val_auc", factor=0.5, patience=2, verbose=1)
]

# ---- Class weights ----------------------------------------------------------
class_weights_arr = class_weight.compute_class_weight("balanced", classes=np.unique(y_train), y=y_train)
class_weight_dict = {i: w for i, w in enumerate(class_weights_arr)}
print("Class weights:", class_weight_dict)

# ---- Train ------------------------------------------------------------------
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=cb_list,
    class_weight=class_weight_dict
)

# ---- Save models -----------------------------------------------------------
print("Saving models...")
model.export(SAVED_MODEL_DIR)  # ✅ use export() for Keras 3
model.save(H5_PATH)            # ✅ still valid for .h5
with open(CHAR_INDEX_PATH, "w", encoding="utf-8") as f:
    json.dump(char_index, f, indent=2)

# ---- Evaluate ---------------------------------------------------------------
y_pred_prob = model.predict(test_ds).ravel()
y_pred = (y_pred_prob >= 0.5).astype(int)
auc = roc_auc_score(y_test, y_pred_prob)
precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average="binary")
print(f"Test AUC: {auc:.4f}")
print(f"Precision: {precision:.4f}, Recall: {recall:.4f}, F1: {f1:.4f}")

print("✅ URL phishing model trained and saved!")
