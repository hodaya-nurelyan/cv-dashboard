# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

# תצורה למניעת באגים + הפעלת build של Rollup ב-JS (ולא native)
ENV npm_config_optional=false
ENV NODE_ENV=development
ENV ROLLUP_FORCE_JS=true

# התקנת תלויות כולל devDependencies
COPY package*.json ./
RUN npm install

# העתקת שאר קבצי הפרויקט
COPY . .

# בנייה עם NODE_ENV=production
ENV NODE_ENV=production
RUN npm run build

# שלב 2: הרצת הפרויקט בקונטיינר מינימלי
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production

# התקנת שרת סטטי לשרת את build
RUN npm install -g serve

# העתקת תיקיית dist בלבד
COPY --from=builder /app/dist ./dist

# פתיחת פורט 5173 (vite build מוגש כאן)
EXPOSE 5173

# הפעלת השרת
CMD ["serve", "-s", "dist", "-l", "5173"]
