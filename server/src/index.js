import 'reflect-metadata';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { formatError } from 'apollo-errors';
import cors from 'cors';
import compression from 'compression';

import './dotenv';
import middlewares from './middlewares';
import routers from './routers';
import appModule from './modules/appModule';

const { tokenVerification } = middlewares;
const { verification } = routers;

const publicPath = process.env.PUBLIC_PATH;
const port = process.env.PORT;
const apolloPath = process.env.APOLLO_PATH;
const apolloUrl = process.env.APOLLO_URL;
const wsPath = process.env.WS_PATH;
const wsUrl = process.env.WS_URL;

const startServer = ({ schema, subscriptions }) => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    formatError,
    context: session => session,
    introspection: true,
    playground: true,
  });
  const corsOptions = {
    exposedHeaders: ['x-token', 'x-refresh-token'],
  };

  app.use(compression());
  app.use(express.static(publicPath));
  app.use(cors(corsOptions));
  app.use(verification);
  app.use(tokenVerification);

  apolloServer.applyMiddleware({ app, path: apolloPath });

  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'service-worker.js'));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
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
  });
};

startServer(appModule);
