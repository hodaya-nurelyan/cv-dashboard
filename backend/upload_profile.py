from dotenv import load_dotenv
import os
import boto3
import json

# טוען את משתני הסביבה מתוך קובץ .env
load_dotenv()

# עכשיו אפשר להשתמש ב-boto3 כרגיל כי הוא שואב את הפרטים מהסביבה

# קריאה מהקובץ profile.json
with open("data/profile.json", "r", encoding="utf-8") as f:
    profile_data = json.load(f)

# הוספת מפתח ראשי
profile_data["id"] = "default"

# התחברות ל-DynamoDB
dynamodb = boto3.resource("dynamodb", region_name=os.getenv("AWS_REGION"))
table = dynamodb.Table("Profiles")

# כתיבת הנתונים
response = table.put_item(Item=profile_data)

print("Profile uploaded successfully.")
