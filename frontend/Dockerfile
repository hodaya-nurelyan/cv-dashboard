# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

ENV npm_config_optional=false
ENV NODE_ENV=development

COPY package*.json ./

# מחיקת node_modules ו package-lock.json לפני התקנה (אם היו)
RUN rm -rf node_modules package-lock.json || true

# עדכון npm לגרסה האחרונה
RUN npm install -g npm@latest

# התקנת כל התלויות כולל devDependencies
RUN npm install

COPY . .

ENV NODE_ENV=production

# הרצת הבנייה
RUN npm run build

# שלב 2: הרצת הפרויקט ב-production
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
