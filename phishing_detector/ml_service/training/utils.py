import numpy as np
import re
import pandas as pd
from sklearn.model_selection import train_test_split
import json

MAX_LEN = 100

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
    text = re.sub(r"[^a-zA-Z0-9:/._-]", "", text.lower())
    encoded = [char_index.get(c, 0) for c in text[:MAX_LEN]]
    padded = np.pad(encoded, (0, MAX_LEN - len(encoded)), "constant")
    return padded

def prepare_data(X, y, char_index):
    X_processed = np.array([preprocess_text(t, char_index) for t in X])
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42
    )
    return X_train, X_test, y_train, y_test
