from fastapi import APIRouter
from pydantic import BaseModel
import os
import json
import requests
import hashlib

router = APIRouter()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = os.getenv("GROQ_API_URL")
GROQ_MODEL = os.getenv("GROQ_MODEL")

# --- In-memory cache --- #
CACHE = {}

def hash_question(question: str) -> str:
    """Convert question to a unique cache key"""
    return hashlib.sha256(question.strip().lower().encode()).hexdigest()

# --- Loads resume file once --- #
def load_resume_context():
    with open("data/profile.json", encoding="utf-8") as f:
        profile = json.load(f)

    resume = f"""
This is the resume of {profile["name"]}, who is a {profile["title"]}.
Summary: {profile["summary"]}
Skills: {', '.join([s['name'] for s in profile['skills']])}
Experience: {"; ".join([f"{e['title']} at {e['company']} ({e['years']})" for e in profile['experience']])}
Projects: {', '.join([p['name'] for p in profile['projects']])}
"""
    return resume

RESUME_CONTEXT = load_resume_context()

SYSTEM_MESSAGE = f"""
You are an assistant that answers questions based solely on the resume of Hodaya, a professional developer. Your role is to speak as if you are Hodaya herself, in the first person.

Resume:
{RESUME_CONTEXT}

You always answer strictly based on her resume only. Do not invent or assume any additional information.

When answering:
1. Always respond in the same language as the user's question.
    If the question is in Hebrew, answer in Hebrew (right-to-left).
    Otherwise, answer in the language the question was asked (left-to-right).
2. Always use a polite, professional, and witty tone.
3. Answer in the first person, as if you are Hodaya herself. For example:
    - If asked: "Do you have experience with PHP?" → respond: "Yes, I have experience with PHP."
    - Or: "No, I don't have experience with X, but I have the ability and passion to learn it quickly."
4. If the user asks a professional or technical question, always provide a direct and relevant answer based solely on the resume.
    Even if the information is not mentioned in the resume, do NOT add the phrase in point 5.
5. 5. If the user asks anything unrelated to professional or technical topics (e.g., personal life), or if you cannot provide any relevant answer at all — respond only with:
    "Only professional questions can be asked here. I am, of course, always happy to schedule a meeting and answer all relevant questions."

However, **if the current question is short or vague, but clearly follows a previous professional or technical question (e.g., a follow-up like “What about Angular?” after asking about PHP)** — treat it as part of the ongoing technical conversation and answer accordingly, without adding the above sentence.

6. Never use phrases like "as mentioned in my resume" or "as I mentioned in my resume" – just answer naturally and directly.

7. If the user asks about a specific technology or skill that is not mentioned in the resume, respond honestly that you don't have experience with it, and always add in a natural tone:

- In English: "No, I don't have experience with [Technology], but I have the ability and passion to learn it quickly."
- In Hebrew: "אין לי ניסיון עם [Technology], אבל יש לי יכולת והתלהבות ללמוד טכנולוגיות חדשות במהירות." (I don't have experience with [Technology], but I have the ability and enthusiasm to learn new technologies quickly.)

Avoid sounding robotic — answer smoothly and personally in first person.


Resume download logic:

- When the user asks 2 or more technical questions in a row (e.g. about technologies, frameworks, experience), and if the resume was not offered yet — offer it.

- Example offer: "Would you like to receive my resume?"

- If the user replies positively (e.g. "Yes", "Sure", "Of course") — respond **only** with:
```json
{{
  "function_call": "offer_resume_download"
}}

Do NOT offer the resume:

if already offered

if less than 2 technical questions

if questions are unrelated (e.g. personal)


- If the user explicitly requests the resume or a link to it (e.g., “Can I download your resume?”, “Send me your resume”, “Can you send me your resume?”, “Can I have a link to your resume?”), respond **only** with the following JSON block — do **not** include any additional text:

```json
{{
    "function_call": "offer_resume_download"
}}


"""




class ChatRequest(BaseModel):
    question: str

@router.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        question = req.question.strip()
        cache_key = hash_question(question)

        # If the question has already been asked – return the answer from the cache
        if cache_key in CACHE:
            return {"answer": CACHE[cache_key]}

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": question}
            ]
        }

        response = requests.post(GROQ_API_URL, headers=headers, json=payload, verify=False)
        response.raise_for_status()
        result = response.json()

        answer = result["choices"][0]["message"]["content"]
        CACHE[cache_key] = answer  # Saves to cache

        return {"answer": answer}

    except Exception as e:
        return {"error": str(e)}