FROM node:18.20.6-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=pass

RUN mkdir -p /app

COPY ./app /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]