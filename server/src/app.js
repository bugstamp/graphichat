import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import paths from '../../paths';

import db from './db';
import typeDefs from './schemas';
import resolvers from './resolvers';
import routers from './routers';
import middlewares from './middlewares';

const { passport, verification } = routers;
const { tokenVerification } = middlewares;

const app = express();
const port = process.env.PORT;
const apollo = new ApolloServer({
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
app.use(passport);
app.use(verification);
app.use(tokenVerification);

apollo.applyMiddleware({ app, path: '/api/graphql' });

app.get('*', (req, res) => {
  res.sendFile(paths.html);
});

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
