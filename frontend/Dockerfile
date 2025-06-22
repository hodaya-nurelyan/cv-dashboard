FROM node:20

WORKDIR /app

ENV npm_config_optional=false

# שלב ראשון: העתקת package.json
COPY package*.json ./

# פתרון הבאג של rollup: מחיקת node_modules ו-package-lock.json אם קיימים
RUN rm -rf node_modules package-lock.json \
    && npm install

# שלב שני: העתקת שאר הפרויקט
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
