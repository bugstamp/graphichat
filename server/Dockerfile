FROM node:10.14.2

RUN apt-get update -y
RUN apt-get install -y bash

ARG APP_DIR=graphichat-server

RUN mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}

COPY ./server/package.json ./

RUN yarn install

COPY ./server/ ./
