import os
import json
import smtplib
from email.message import EmailMessage

from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

from routes.contact import router as contact_router
from chatbot import router as chatbot_router

import requests
# --- טעינת משתני סביבה ---
load_dotenv()
ALLOWED_ORIGINS = os.environ.get("DOMAIN_NAME", "*").split(",")

# --- יצירת האפליקציה ---
app = FastAPI()

# --- דיבאגר (למצב פיתוח בלבד) ---
if os.getenv("DEBUGPY_ENABLED") == "1":
    import debugpy
    debugpy.listen(("0.0.0.0", 5678))
    print("✅ Debugger is listening on port 5678...")

    @app.middleware("http")
    async def debug_all_requests(request: Request, call_next):
        debugpy.breakpoint()  # יתפוס בכל קריאה
        response = await call_next(request)
        return response


# --- הגדרת CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- מסלול לפרופיל ---


@app.get("/api/profile")
def get_profile():
    # import debugpy; debugpy.breakpoint()
    try:
        with open("data/profile.json", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"error": "Profile not found"}


# @app.get("/api/profile")
# def get_profile():
#     try:
#         url = os.environ.get("PROFILE_API_URL")
#         if not url:
#             return {"error": "PROFILE_API_URL is not set in .env"}

#         response = requests.get(url)
#         response.raise_for_status()
#         return response.json()

#     except Exception as e:
#         return {"error": str(e)}

# --- צירוף הרואטרים ---
app.include_router(chatbot_router)
app.include_router(contact_router)
