# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

# מוודאים התקנה נקייה + עדכון npm לגרסה עדכנית
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install -g npm@latest
RUN npm install

# העתקת קוד
COPY . .

# משתנים חשובים להפעלת build בלי בעיות
ENV ROLLUP_FORCE_JS=true
ENV NODE_ENV=production
ENV npm_config_optional=false

# הפעלת build
RUN npm run build

# שלב 2: הרצת הפרויקט בקונטיינר מינימלי
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
