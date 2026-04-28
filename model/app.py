from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
import os
import io

app = Flask(__name__)
CORS(app)  # Allow requests from Node.js backend

# ─── Load Model ───────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.h5')

from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Dense

def custom_dense(**kwargs):
    kwargs.pop("quantization_config", None)
    return Dense(**kwargs)

try:
    model = load_model(MODEL_PATH, custom_objects={"Dense": custom_dense})
    print(f"✅ Model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    model = None

# ─── Classes ──────────────────────────────────────────────────────────────────
classes = ["glioma", "meningioma", "no_tumor", "pituitary"]

IMG_SIZE = (228, 228)  # Match your model's input size

# ─── Preprocessing ────────────────────────────────────────────────────────────
def preprocess(image: Image.Image) -> np.ndarray:
    image = image.convert("RGB")
    image = image.resize((128, 128))   # ✅ correct place

    img_array = np.array(image)
    print("DEBUG SHAPE:", img_array.shape)

    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ─── Routes ───────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None
    })

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        # Read image from uploaded file bytes
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))

        # Preprocess & predict
        img_array = preprocess(image)
        pred = model.predict(img_array)[0]
        index = int(np.argmax(pred))
        confidence = float(pred[index])

        # Build full result with all class probabilities
        all_probs = {cls: float(pred[i]) for i, cls in enumerate(classes)}

        return jsonify({
            "result": classes[index],
            "confidence": round(confidence * 100, 2),
            "all_probabilities": {k: round(v * 100, 2) for k, v in all_probs.items()}
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
