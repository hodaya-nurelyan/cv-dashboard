# contact.py

from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel, EmailStr
import boto3
import os

# טוען משתני סביבה
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

# מודל נתונים לטופס
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/api/contact")
async def send_contact_form(form: ContactForm, request: Request):
    try:
        # טקסט ההודעה
        body = f"""
הודעה חדשה התקבלה דרך askhodaya.com

שם: {form.name}
אימייל: {form.email}

הודעה:
{form.message}

IP של השולח: {request.client.host}
"""

        # חיבור ל־AWS SES
        ses = boto3.client(
            "ses",
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
            region_name=os.environ["AWS_REGION"]
        )

        # שליחת מייל
        response = ses.send_email(
            Source=os.environ["EMAIL_FROM"],
            Destination={"ToAddresses": [os.environ["EMAIL_TO"]]},
            Message={
                "Subject": {"Data": "פנייה חדשה מהאתר askhodaya.com"},
                "Body": {"Text": {"Data": body}}
            }
        )

        return {"message": "Email sent successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {str(e)}")
