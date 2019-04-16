import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import cors from 'cors';

import './dotenv';
import paths from '../../paths';

import db from './db';
import modules from './modules';
import middlewares from './middlewares';
import routers from './routers';

const { tokenVerification } = middlewares;
const { verification } = routers;

const port = process.env.PORT;
const apolloPath = process.env.APOLLO_PATH;

const startServer = async ({ schema }) => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    formatError,
    context: ({ req }) => {
      const { user } = req;

      return { db, user };
    },
  });
  const corsOptions = {};

  app.use(express.static(paths.public));
  app.use(cors(corsOptions));
  app.use(tokenVerification);
  app.use(verification);

  apolloServer.applyMiddleware({ app, path: apolloPath });

  app.get('*', (req, res) => {
    res.sendFile(paths.html);
  });

  app.listen({ port }, () => {
    console.log(`Server is listening on port - ${port}`);
  });
};

startServer(modules);
