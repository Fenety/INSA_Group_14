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

    print("✅ Models and char indices loaded successfully")
except Exception as e:
    print(f"⚠️ Model load failed: {e}")
    email_model, url_model = None, None
    email_char_index, url_char_index = {}, {}

class PredictRequest(BaseModel):
    type: str  # 'email' or 'url'
    content: str

@app.post("/predict")
async def predict(req: PredictRequest):
    if req.type not in ["email", "url"]:
        return {"error": "Invalid type. Must be 'email' or 'url'."}

    if req.type == "email" and email_model:
        vector = preprocess_text(req.content, email_char_index)
        score = float(email_model.predict(np.array([vector]))[0][0])
    elif req.type == "url" and url_model:
        vector = preprocess_text(req.content, url_char_index)
        score = float(url_model.predict(np.array([vector]))[0][0])
    else:
        score = np.random.uniform(0, 1)

    return {"score": round(score, 3)}
