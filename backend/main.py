from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from gtts import gTTS  
import cv2
import numpy as np
import mediapipe as mp
import joblib
import pandas as pd
import os
import json

app = FastAPI()

@app.get("/speak/{text}")
def speak_text(text: str):
    tts = gTTS(text=text, lang='en', tld='com.pk')  
    file_path = f"audio_{text}.mp3"
    if os.path.exists(file_path):  
        os.remove(file_path)
    tts.save(file_path)
    return FileResponse(file_path, media_type="audio/mpeg", filename=file_path)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_hands = mp.solutions.hands
hands_detector = mp_hands.Hands(static_image_mode=True, max_num_hands=2)  

model = joblib.load("hand_gesture_knn_model.pkl")

@app.post("/detect-hand/")
async def detect_hand(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    results = hands_detector.process(img_rgb)
    response = {"hands_detected": 0, "gesture": None, "hands": []}

    if results.multi_hand_landmarks:
        response["hands_detected"] = len(results.multi_hand_landmarks)

        for hand_landmarks in results.multi_hand_landmarks:
            landmarks = [lm for lm in hand_landmarks.landmark]
            flat_landmarks = [coord for lm in landmarks for coord in [lm.x, lm.y, lm.z]]
            response["hands"].append([{"x": lm.x, "y": lm.y, "z": lm.z} for lm in landmarks])

          
            df = pd.DataFrame([flat_landmarks])
            prediction = model.predict(df)[0]
            response["gesture"] = prediction

    return response
