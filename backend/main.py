from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from dotenv import load_dotenv
import os

# טוען משתני סביבה
load_dotenv()

# ייבוא רואטרים
from chatbot import router as chatbot_router




app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from email.message import EmailMessage
import smtplib
import json

from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, Request




# טוען משתני סביבה
load_dotenv()

# ייבוא רואטרים
from chatbot import router as chatbot_router

app = FastAPI()

ALLOWED_ORIGINS = os.environ.get("DOMAIN_NAME", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# קריאה לקובץ הפרופיל
@app.get("/api/profile")
def get_profile():
    with open("data/profile.json", encoding="utf-8") as f:
        return json.load(f)

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

from routes.contact import router as contact_router
app.include_router(contact_router)
