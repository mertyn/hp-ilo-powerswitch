# syntax=docker/dockerfile:1

FROM node:18.16.1-alpine3.18
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD node build/index.js
EXPOSE 5000