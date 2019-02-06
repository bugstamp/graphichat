import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import paths from '../../paths';

import db from './db';
import typeDefs from './schemas';
import resolvers from './resolvers';
import routers from './routers';
import middlewares from './middlewares';

const { verification } = routers;
const { tokenVerification } = middlewares;

const app = express();
const port = process.env.PORT;
const path = process.env.APOLLO_PATH;
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { user } = req;

    return {
      db,
      user,
    };
  },
});
const corsOptions = {};

app.use(express.static(paths.public));
app.use(cors(corsOptions));
app.use(verification);
app.use(tokenVerification);

apolloServer.applyMiddleware({ app, path });

app.get('*', (req, res) => {
  res.sendFile(paths.html);
});

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
