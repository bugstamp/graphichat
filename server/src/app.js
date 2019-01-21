import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import paths from '../../paths';

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
    return {
      db,
      user: req.user,
    };
  },
});
server.applyMiddleware({ app });

app.use(express.static(paths.public));
app.use(tokenVerification);

app.get('/verification/:regToken', emailVerification);
app.get('*', (req, res) => {
  res.sendFile(paths.html);
});


app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
