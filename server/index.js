import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import db from './db';
import typeDefs from './schemas';
import resolvers from './resolvers';

import paths from '../paths';
import middlewares from './middlewares';

const { tokenVerification, emailVerification } = middlewares;

const app = express();
const port = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log('reguser');
    // console.log(req.user);
    return {
      db,
      user: req.user,
    };
  },
});
server.applyMiddleware({ app });

app.use(express.static(paths.public.root));
app.use(tokenVerification);

app.get('/verification/:regToken', emailVerification);
app.get('*', (req, res) => {
  res.sendFile(paths.public.html);
});

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
