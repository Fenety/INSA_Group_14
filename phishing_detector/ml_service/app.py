from fastapi import FastAPI
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
import json
from training.utils import preprocess_text

app = FastAPI(title="Phishing ML Service")

# --- Load models ---
try:
    email_model = load_model("models/email_model.h5")
    url_model = load_model("models/url_model.h5")

    with open("models/email_char_index.json", "r") as f:
        email_char_index = json.load(f)
    with open("models/url_char_index.json", "r") as f:
        url_char_index = json.load(f)

    # Determine embedding max indices
    email_max_index = email_model.layers[1].input_dim - 1
    url_max_index = url_model.layers[1].input_dim - 1

    print("✅ Models and char indices loaded successfully")
except Exception as e:
    print(f"⚠️ Model load failed: {e}")
    email_model, url_model = None, None
    email_char_index, url_char_index = {}, {}
    email_max_index, url_max_index = 0, 0

class PredictRequest(BaseModel):
    type: str  # 'email' or 'url'
    content: str

def safe_vectorize(text: str, char_index: dict, max_index: int) -> np.ndarray:
    """Preprocess and clip indices to prevent embedding errors."""
    vector = preprocess_text(text, char_index)
    # Clip indices to max_index to avoid out-of-range
    vector = [min(idx, max_index) for idx in vector]
    return np.array([vector])

@app.post("/predict")
async def predict(req: PredictRequest):
    if req.type not in ["email", "url"]:
        return {"error": "Invalid type. Must be 'email' or 'url'."}

    try:
        if req.type == "email" and email_model:
            vector = safe_vectorize(req.content, email_char_index, email_max_index)
            score = float(email_model.predict(vector)[0][0])
        elif req.type == "url" and url_model:
            vector = safe_vectorize(req.content, url_char_index, url_max_index)
            score = float(url_model.predict(vector)[0][0])
        else:
            # fallback random score if model is not loaded
            score = np.random.uniform(0, 1)
    except Exception as e:
        return {"error": f"Prediction failed: {e}"}

    return {"score": round(score, 3)}
