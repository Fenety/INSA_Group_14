# train_email_model.py
import os
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_recall_fscore_support, roc_auc_score

# ---- Config ----
DATA_PATH = "data/emails.csv"
CHAR_INDEX_PATH = "models/email_char_index.json"
SAVED_MODEL_DIR = "models/email_saved_model"
H5_PATH = "models/email_model.h5"
MAXLEN = 200                # sequence length to pad/truncate to
EMBED_DIM = 128
BATCH_SIZE = 64
EPOCHS = 15
SEED = 42

os.makedirs("models", exist_ok=True)

# ---- Utilities ----------------------------------------------------------------
def build_char_index(texts, min_count=1):
    """Build char -> id mapping from list of strings."""
    freq = {}
    for t in texts:
        for ch in t:
            freq[ch] = freq.get(ch, 0) + 1
    # keep all chars with freq >= min_count
    chars = sorted([c for c, ct in freq.items() if ct >= min_count])
    # reserve 0 for padding
    char_index = {c: i+1 for i, c in enumerate(chars)}
    return char_index

def texts_to_sequences(texts, char_index, maxlen=MAXLEN):
    seqs = []
    unk_id = len(char_index) + 1
    for t in texts:
        ids = [char_index.get(ch, unk_id) for ch in t]
        if len(ids) > maxlen:
            ids = ids[:maxlen]
        seqs.append(ids)
    return tf.keras.preprocessing.sequence.pad_sequences(seqs, maxlen=maxlen, padding='post', truncating='post')

def load_dataset(path=DATA_PATH):
    """Simple CSV loader expecting columns text,label (no header enforcement)."""
    import csv
    texts, labels = [], []
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.reader(f)
        # If there is a header like text,label, skip it
        first = next(reader)
        # Detect header
        if len(first) >= 2 and (first[0].lower().startswith("text") or first[1].lower().startswith("label")):
            pass  # header consumed
        else:
            # first row was actual data
            texts.append(first[0])
            labels.append(int(first[1]))
        for row in reader:
            if not row: continue
            texts.append(row[0])
            labels.append(int(row[1]))
    return texts, np.array(labels, dtype=np.int32)

# ---- Load data ----------------------------------------------------------------
print("Loading data...")
X_texts, y = load_dataset(DATA_PATH)
print(f"Loaded {len(X_texts)} samples")

# ---- Build or load char index -----------------------------------------------
if os.path.exists(CHAR_INDEX_PATH):
    print("Loading existing char index...")
    with open(CHAR_INDEX_PATH, 'r', encoding='utf-8') as f:
        char_index = json.load(f)
else:
    print("Building char index...")
    char_index = build_char_index(X_texts)
    with open(CHAR_INDEX_PATH, 'w', encoding='utf-8') as f:
        json.dump(char_index, f, ensure_ascii=False, indent=2)
print(f"Vocab size (chars): {len(char_index)}")

# ---- Prepare numeric sequences ----------------------------------------------
X = texts_to_sequences(X_texts, char_index, maxlen=MAXLEN)
print("X shape:", X.shape)

# ---- Train/test split -------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.12, random_state=SEED, stratify=y
)

# Optionally create a validation split from train
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.12, random_state=SEED, stratify=y_train
)

print("Train:", X_train.shape, "Val:", X_val.shape, "Test:", X_test.shape)

# ---- tf.data pipelines ------------------------------------------------------
def make_dataset(X_arr, y_arr, batch_size=BATCH_SIZE, shuffle=False):
    ds = tf.data.Dataset.from_tensor_slices((X_arr, y_arr))
    if shuffle:
        ds = ds.shuffle(buffer_size=len(X_arr), seed=SEED)
    ds = ds.batch(batch_size).prefetch(tf.data.AUTOTUNE)
    return ds

train_ds = make_dataset(X_train, y_train, batch_size=BATCH_SIZE, shuffle=True)
val_ds = make_dataset(X_val, y_val, batch_size=BATCH_SIZE)
test_ds = make_dataset(X_test, y_test, batch_size=BATCH_SIZE)

# ---- Model ------------------------------------------------------------------
vocab_size = len(char_index) + 2  # +1 for unk, +1 for padding already 0
inputs = layers.Input(shape=(MAXLEN,), dtype='int32')
x = layers.Embedding(input_dim=vocab_size, output_dim=EMBED_DIM, input_length=MAXLEN)(inputs)

# Conv block to capture local patterns
x = layers.Conv1D(filters=128, kernel_size=3, padding='same', activation='relu')(x)
x = layers.MaxPooling1D(pool_size=2)(x)
x = layers.Conv1D(filters=128, kernel_size=5, padding='same', activation='relu')(x)
x = layers.MaxPooling1D(pool_size=2)(x)

# Bidirectional LSTM
x = layers.Bidirectional(layers.LSTM(128, return_sequences=False, dropout=0.2, recurrent_dropout=0.0))(x)
x = layers.LayerNormalization()(x)
x = layers.Dropout(0.4)(x)

# Final dense layers
x = layers.Dense(64, activation='relu')(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(1, activation='sigmoid')(x)

model = models.Model(inputs=inputs, outputs=outputs)
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='binary_crossentropy',
    metrics=[tf.keras.metrics.AUC(name='auc'), 'accuracy']
)

model.summary()

# ---- Callbacks --------------------------------------------------------------
cb_list = [
    callbacks.ModelCheckpoint(H5_PATH, monitor='val_auc', mode='max', save_best_only=True, verbose=1),
    callbacks.EarlyStopping(monitor='val_auc', patience=4, mode='max', restore_best_weights=True, verbose=1),
    callbacks.ReduceLROnPlateau(monitor='val_auc', factor=0.5, patience=2, mode='max', verbose=1),
    callbacks.TensorBoard(log_dir="logs/email_training")
]

# ---- Class weights (help with imbalance) ------------------------------------
# Compute class weights from training labels
from sklearn.utils import class_weight
class_weights = class_weight.compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
class_weight_dict = {i: w for i, w in enumerate(class_weights)}
print("Class weight dict:", class_weight_dict)

# ---- Train ------------------------------------------------------------------
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=cb_list,
    class_weight=class_weight_dict,
)

# ---- Save model as SavedModel (best for serving) ----------------------------
print("Saving SavedModel to", SAVED_MODEL_DIR)
model.export(SAVED_MODEL_DIR)   # ✅ Correct way in Keras 3

# Also save final H5 (ModelCheckpoint already saved best H5)
model.save(H5_PATH)  # ✅ still valid for H5 format

# ---- Evaluate on test set ---------------------------------------------------
print("Evaluating on test set...")
y_pred_prob = model.predict(test_ds).ravel()
y_pred = (y_pred_prob >= 0.5).astype(int)

auc = roc_auc_score(y_test, y_pred_prob)
precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='binary')
print(f"Test AUC: {auc:.4f}")
print(f"Precision: {precision:.4f}, Recall: {recall:.4f}, F1: {f1:.4f}")

# Optionally write tokenizer/char_index for inference (already saved above)
with open(CHAR_INDEX_PATH, 'w', encoding='utf-8') as f:
    json.dump(char_index, f, ensure_ascii=False, indent=2)

print("Done.")
