#!/bin/bash

set -e  # עצור אם יש שגיאה

# הפעלת backend עם debugpy
echo "🚀 Starting FastAPI backend with debugpy..."
cd ~/projects/cv-dashboard-full/backend

# ודא שסביבת הפיתוח קיימת
if [ ! -d "venv" ]; then
  echo "❌ Virtualenv 'venv' not found. Please create it with 'python3 -m venv venv'"
  exit 1
fi

source venv/bin/activate

# בדיקה אם פורט 8000 תפוס
if lsof -i:8000 >/dev/null; then
  echo "⚠️ Port 8000 is already in use. Kill existing process or change port."
  exit 1
fi

# בדיקה אם פורט 5678 תפוס
if lsof -i:5678 >/dev/null; then
  echo "⚠️ Port 5678 (debugpy) is already in use. Kill existing process or change port."
  exit 1
fi

# הגדרת משתני סביבה
export DEBUGPY_ENABLED=1
export DOMAIN_NAME=*

# הרצת השרת
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

BACKEND_PID=$!

# המתן קצת כדי לוודא שהשרת עלה
sleep 2

# הפעלת frontend
echo "🚀 Starting Vite frontend..."
cd ~/projects/cv-dashboard-full/frontend

# npm install אם node_modules לא קיים
if [ ! -d "node_modules" ]; then
  npm install
fi

npm run dev &

FRONTEND_PID=$!

# מידע למשתמשת
echo ""
echo "✅ Both servers are running!"
echo "🧠 Backend (FastAPI) → http://localhost:8000"
echo "🧠 Frontend (Vite)   → http://localhost:5173"
echo ""
echo "💡 Press Ctrl+C to stop both servers."

# המתן עד שהיוזר תעצור
wait $BACKEND_PID $FRONTEND_PID
