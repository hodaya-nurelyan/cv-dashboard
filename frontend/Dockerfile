# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
ENV npm_config_optional=false

COPY package*.json ./
RUN npm install

COPY . .

# רק ב-production נריץ build
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# שלב 2: הרצת dev או prod
FROM node:20 AS runner

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# במקרה של production – נעתיק את התוצר ונריץ serve
# במקרה של dev – נעתיק את הקוד המלא ונריץ dev server
COPY --from=builder /app /app

RUN if [ "$NODE_ENV" = "production" ]; then npm install -g serve; fi

EXPOSE 5173

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then serve -s dist -l 5173; else npm run dev -- --host; fi"]
