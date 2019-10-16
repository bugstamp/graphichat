FROM node:10.14.2

RUN apt-get update -y
RUN apt-get install -y bash
RUN apt-get install -y dos2unix

ARG APP_DIR=graphichat-server

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY ./.browserslistrc ./
COPY ./scripts/docker-server-entrypoint.sh ./

RUN dos2unix ./docker-server-entrypoint.sh

RUN mkdir -p /${APP_DIR}/cache_modules
WORKDIR /${APP_DIR}/cache_modules

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN yarn install

RUN mkdir -p /${APP_DIR}/server
WORKDIR /${APP_DIR}/server

COPY ./server/ ./
