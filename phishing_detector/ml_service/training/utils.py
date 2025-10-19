import numpy as np
import re
import pandas as pd
from sklearn.model_selection import train_test_split
import json

MAX_LEN = 200

def build_char_index(texts):
    chars = sorted(list(set("".join(texts))))
    char_index = {c: i + 1 for i, c in enumerate(chars)}  # 0 reserved for padding
    return char_index

def save_char_index(char_index, path):
    with open(path, "w") as f:
        json.dump(char_index, f)

def load_dataset(file_path):
    df = pd.read_csv(file_path)
    X, y = df["text"].astype(str).tolist(), df["label"].values
    return X, y

def preprocess_text(text, char_index):
    """Encode and pad/truncate `text` to length MAX_LEN.

    Uses a dedicated unknown-token id equal to len(char_index) + 1 so
    unknown characters aren't mapped to the padding id (0).
    Returns a numpy array of dtype int32 and shape (MAX_LEN,).
    """
    text = re.sub(r"[^a-zA-Z0-9:/._-]", "", text.lower())
    unk_id = len(char_index) + 1
    # map characters to ids, truncating to MAX_LEN
    encoded = [char_index.get(c, unk_id) for c in text[:MAX_LEN]]
    # pad with zeros (padding id = 0) up to MAX_LEN
    if len(encoded) < MAX_LEN:
        padded = np.pad(encoded, (0, MAX_LEN - len(encoded)), "constant")
    else:
        padded = np.array(encoded, dtype=np.int32)
    return np.array(padded, dtype=np.int32)

def prepare_data(X, y, char_index):
    X_processed = np.array([preprocess_text(t, char_index) for t in X])
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42
    )
    return X_train, X_test, y_train, y_test
