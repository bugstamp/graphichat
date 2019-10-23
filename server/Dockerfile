FROM node:10.14.2

RUN apt-get update && apt-get install -y bash dos2unix build-essential python rsync

ARG APP_DIR=graphichat

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY ./.env ./
COPY ./.browserslistrc ./
COPY ./scripts/server-entrypoint.sh ./

RUN dos2unix ./server-entrypoint.sh

RUN mkdir -p /${APP_DIR}/cache_modules
WORKDIR /${APP_DIR}/cache_modules

COPY ./server/package.json ./

RUN yarn install

RUN mkdir -p /${APP_DIR}/server
WORKDIR /${APP_DIR}/server

COPY ./server/. ./
