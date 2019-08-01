import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { formatError } from 'apollo-errors';
import cors from 'cors';

import './dotenv';
import paths from '../../paths';

import middlewares from './middlewares';
import routers from './routers';
import appModule from './modules/appModule';

const { tokenVerification } = middlewares;
const { verification } = routers;

const port = process.env.PORT;
const apolloPath = process.env.APOLLO_PATH;
const apolloUrl = process.env.APOLLO_URL;
const wsPath = process.env.WS_PATH;
const wsUrl = process.env.WS_URL;

console.log(process.env);

const startServer = ({ schema, subscriptions }) => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    formatError,
    context: session => session,
  });
  const corsOptions = {
    exposedHeaders: ['x-token', 'x-refresh-token'],
  };

  app.use(express.static(paths.public));
  app.use(cors(corsOptions));
  app.use(tokenVerification);
  app.use(verification);

  apolloServer.applyMiddleware({ app, path: apolloPath });

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(paths.publicSw);
  });
  app.get('*', (req, res) => {
    res.sendFile(paths.html);
  });

  const ws = createServer(app);
  ws.listen(port, () => {
    console.log(`Server ready at ${apolloUrl}`);
    console.log(`Subscriptions ready at ${wsUrl}`);

    SubscriptionServer.create({
      schema,
      execute,
      subscribe,
      ...subscriptions,
    }, {
      server: ws,
      path: wsPath,
    });
  }).then(({ url }) => {
    console.log(url);
  });
};

startServer(appModule);
