FROM node:20

WORKDIR /app

# נבטיח שנדלג על חבילות אופציונליות וננקה קאש
ENV npm_config_optional=false

# נתחיל מהתלויות
COPY package*.json ./

# נבצע התקנה נקייה לגמרי
RUN rm -rf node_modules package-lock.json && npm install --omit=optional

# נוסיף את שאר קבצי הפרויקט
COPY . .

# פותחים את הפורט ש-Vite מריץ עליו
EXPOSE 3000

# מריצים את השרת עם האופציה --host כדי שזרים יוכלו לגשת
CMD ["npm", "run", "dev", "--", "--host"]
