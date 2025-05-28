from fastapi import APIRouter
from pydantic import BaseModel
import os
import json
import requests 


import os
print("hodayaaaaaaaaaaaaaaa🔑", os.getenv("GROQ_API_KEY"))

router = APIRouter()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"   

class ChatRequest(BaseModel):
    question: str

@router.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        with open("data/profile.json", encoding="utf-8") as f:
            profile = json.load(f)

        context = f"""
        זו קורות החיים של {profile["name"]}, שהיא {profile["title"]}.
        סיכום: {profile["summary"]}
        כישורים: {', '.join([s['name'] for s in profile['skills']])}
        ניסיון:
        {"; ".join([f"{e['title']} ב-{e['company']} ({e['years']})" for e in profile['experience']])}
        פרויקטים: {', '.join([p['name'] for p in profile['projects']])}
        """

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": "ענה על שאלות רק לפי קורות החיים של המפתחת"},
                {"role": "user", "content": context},
                {"role": "user", "content": req.question}
            ]
        }


        
        # payload = {
        #     "model": "meta-llama/llama-4-scout-17b-16e-instruct",  # או כל מודל אחר ש-Groq תומכים בו
        #     "messages": [
        #         {"role": "system", "content": "You are a helpful assistant."},
        #         {"role": "user", "content": "Tell me about yourself"}
        #     ]
        # }

        #TODO , change this line

      # response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response = requests.post(GROQ_API_URL, headers=headers, json=payload, verify=False)
        print("=================================")
        print(response.status_code)
        print(response.json())
        print("=================================")

        response.raise_for_status()
        result = response.json()

        return {"answer": result["choices"][0]["message"]["content"]}

    except Exception as e:
        return {"error": str(e)}
