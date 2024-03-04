FROM node:20.10-alpine3.18

WORKDIR /client

COPY package*.json ./

RUN npm install
COPY . .

CMD ["npm", "run", "dev"]