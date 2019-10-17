FROM node:10.14.2

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y bash dos2unix rsync

ARG APP_DIR=graphichat

RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY ./.browserslistrc ./
COPY ./scripts/client-entrypoint.sh ./

RUN dos2unix ./client-entrypoint.sh

RUN mkdir -p /${APP_DIR}/cache_modules
WORKDIR /${APP_DIR}/cache_modules

COPY ./client/package.json ./

RUN yarn install

RUN mkdir -p /${APP_DIR}/client
WORKDIR /${APP_DIR}/client

COPY ./client/ ./
