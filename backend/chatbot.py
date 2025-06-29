from fastapi import APIRouter
from pydantic import BaseModel
import os
import json
import requests
import hashlib
from typing import List

router = APIRouter()

# GROQ config
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = os.getenv("GROQ_API_URL")
GROQ_MODEL = os.getenv("GROQ_MODEL", "mixtral-8x7b-32768")

# --- In-memory cache --- #
CACHE = {}


def hash_question(question: str) -> str:
    return hashlib.sha256(question.strip().lower().encode()).hexdigest()


def load_resume_context():
    with open("data/profile.json", encoding="utf-8") as f:
        profile = json.load(f)

    about_section = "\n".join([list(p.values())[0] for p in profile["about"]])
    education_section = "; ".join(
        [f"{edu['degree']} from {edu['school']} ({edu['years']})" for edu in profile["education"]])
    experience_section = "\n\n".join([
        f"{e['title']} at {e['company']} ({e['years']})\n"
        f"Stack: {', '.join(e['stack'])}\n"
        f"Highlights: {' '.join(e['highlights'])}"
        for e in profile['experience']
    ])
    projects_section = "\n\n".join([
        f"{p['name']} - {p['description']} ({p['link']})\n"
        f"Stack: {', '.join(p['stack'])}"
        for p in profile['projects']
    ])

    resume = f"""
This is the resume of {profile["name"]}, who is a {profile["title"]}.
Summary: {profile["summary"]}

About:
{about_section}

Education:
{education_section}

Experience:
{experience_section}

Projects:
{projects_section}
"""
    return resume


RESUME_CONTEXT = load_resume_context()

SYSTEM_MESSAGE = f"""
You are Hodaya, a professional developer. Answer based only on the resume below, in first person.

Resume:
{RESUME_CONTEXT}

Rules:

1. Answer in the same language as the user:
   - Hebrew: use feminine, correct grammar.
   - English: use natural English.
  -  When answering in Hebrew, always speak about yourself using feminine grammatical forms (e.g., "אני מתמחה", "אני מכירה", "עבדתי"). Never use masculine forms when referring to yourself.


2. For greetings ("hi", "hello", "היי", "שלום") without question, reply exactly:
   - Hebrew: "היי, אני הודיה, מוזמנ/ת לשאול שאלות מקצועיות עליי :)"
   - English: "Hey, I'm Hodaya, happy to answer professional questions about me."

3. Answer only professional questions. If personal or unrelated, reply:
   - Hebrew: "כאן אפשר לשאול שאלות מקצועיות בלבד. כמובן, אני תמיד שמחה לקבוע שיחה ולענות על כל שאלה רלוונטית."
   - English: "Only professional questions can be asked here. I'm, of course, always happy to schedule a meeting and answer all relevant questions."

4. For technologies not in the resume, say:
   - Hebrew: "אין לי ניסיון עם [TECH], אבל יש לי יכולת והתלהבות ללמוד טכנולוגיות חדשות במהירות."
   - English: "No, I don't have experience with [TECH], but I have the ability and passion to learn it quickly."

5. Use "מכירה" (know/familiar with) correctly in Hebrew, never "מוכרת".

6. After 2+ technical questions, offer the resume in the same language:
   - Hebrew: "רוצה שאשלח לך את קורות החיים שלי?"
   - English: "Would you like to receive my resume?"

7. If user agrees, respond ONLY with:
```json
{{
    "function_call": "offer_resume_download"
}}


"""

# --- Pydantic models --- #


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]

# --- Main endpoint --- #


@router.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        messages = [{"role": "system", "content": SYSTEM_MESSAGE}] + [
            {"role": m.role, "content": m.content} for m in req.messages
        ]

        # Optional: Use only last user message for caching
        last_user_message = next(
            (m.content for m in reversed(req.messages) if m.role == "user"), "")
        cache_key = hash_question(last_user_message)

        if cache_key in CACHE:
            return {"answer": CACHE[cache_key]}

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": GROQ_MODEL,
            "messages": messages
        }

        print(payload)
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        answer = result["choices"][0]["message"]["content"]
        CACHE[cache_key] = answer

        return {"answer": answer}

    except Exception as e:
        return {"error": str(e)}
