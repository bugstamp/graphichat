FROM node:10.14.2

RUN apt-get update
RUN apt-get install bash

ARG APP_DIR=graphichat
ARG CLIENT_DIR=client
ARG SERVER_DIR=server

RUN mkdir -p ${APP_DIR}
RUN mkdir -p ${APP_DIR}/${CLIENT_DIR}
RUN mkdir -p ${APP_DIR}/${SERVER_DIR}

WORKDIR ${APP_DIR}

COPY ./package.json ./
COPY ./${CLIENT_DIR}/package.json ${CLIENT_DIR}
COPY ./${SERVER_DIR}/package.json ${SERVER_DIR}

RUN yarn install

COPY ./ ./

CMD ["/bin/bash"]
