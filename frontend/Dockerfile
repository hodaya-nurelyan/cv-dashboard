FROM node:20

WORKDIR /app

ENV npm_config_optional=false

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
