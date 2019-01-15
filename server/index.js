import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// eslint-disable-next-line
import dotenv from '../dotenv';
import paths from '../paths';

import db from './db';
import typeDefs from './schemas';
import resolvers from './resolvers';
import middlewares from './middlewares';

const { tokenVerification, emailVerification } = middlewares;

const app = express();
const port = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.user);
    return {
      db,
      user: req.user,
    };
  },
});

app.use(express.static(paths.public));
app.use(tokenVerification);

app.get('/verification/:regToken', emailVerification);
app.get('*', (req, res) => {
  res.sendFile(paths.html);
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
