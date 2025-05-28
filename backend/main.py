from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

from dotenv import load_dotenv
load_dotenv()



from chatbot import router as chatbot_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/profile")
def get_profile():
    with open("data/profile.json", encoding="utf-8") as f:
        return json.load(f)

app.include_router(chatbot_router)
