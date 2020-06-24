FROM node:12.18.1-alpine3.12

RUN apk update && apk add --no-cache bash git

ARG APP_DIR=/home/node/graphichat

RUN mkdir -p ${APP_DIR}/client && chown -R node:node ${APP_DIR}
WORKDIR ${APP_DIR}

COPY ./.env ./
COPY ./.browserslistrc ./

WORKDIR ${APP_DIR}/client

COPY ./client/package.json ./
COPY ./client/yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node ./client/. ./

CMD ["yarn", "start"]
