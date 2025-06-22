# שלב 1: בניית הפרויקט
FROM node:20 AS builder

WORKDIR /app

ENV npm_config_optional=false

COPY package*.json ./
RUN npm install

COPY . .

# אם הפקודה היא production – נבנה את האתר
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# שלב 2: הרצת dev או prod
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=development

# נעתיק את node_modules כי Dev צריך אותם
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

EXPOSE 5173

# Dev mode – run Vite dev server
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm install -g serve && serve -s dist -l 5173; else npm run dev -- --host; fi"]
