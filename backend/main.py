from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from dotenv import load_dotenv
import os

# טוען משתני סביבה
load_dotenv()

# ייבוא רואטרים
from chatbot import router as chatbot_router
from routes.integrations import router as integrations_router



app = FastAPI()

# הגדרות CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# קריאה לקובץ הפרופיל
@app.get("/api/profile")
def get_profile():
    with open("data/profile.json", encoding="utf-8") as f:
        return json.load(f)

# כולל את הרואטרים
app.include_router(chatbot_router)
app.include_router(integrations_router)
