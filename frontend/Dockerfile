# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

ENV npm_config_optional=false
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
RUN npm run build

# שלב 2: הרצת הפרויקט ב-production
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production

# התקנת serve לשרת את הקבצים הסטטיים
RUN npm install -g serve

# העתקת תיקיית ה-build בלבד
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
