# שלב בסיסי לפיתוח עם שרת Vite
FROM node:20

WORKDIR /app

# העתקת קבצי package כדי להתקין רק מה שצריך
COPY package*.json ./

# התקנת תלויות כולל devDependencies
RUN npm install

# העתקת שאר הקבצים
COPY . .

# פורט ש־Vite מאזין עליו בסביבה מקומית
EXPOSE 5173

# הרצה עם Vite במצב דב
CMD ["npm", "run", "dev", "--", "--host"]

