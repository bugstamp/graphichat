FROM node:10.14.2

RUN apt-get update -y
RUN apt-get install -y bash

ARG APP_DIR=graphichat-client

RUN mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}

COPY ./client/package.json ./

RUN yarn install

COPY ./client/ ./
