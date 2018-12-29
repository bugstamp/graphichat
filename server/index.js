import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import paths from '../webpack/paths';

import db from './db';
import typeDefs from './schema';
import resolvers from './resolvers';

db.connection();

const app = express();
const port = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      db,
    };
  },
});

app.get('/verification/:regToken', async (reg, res) => {
  const { regToken } = reg.params;
  const { token, refreshToken } = await db.User.verifySignUp(regToken);

  res.set('Access-Control-Expose-Headers', 'token', 'refresh-token');
  res.set('token', token);
  res.set('refresh-token', refreshToken);
  res.redirect('/');
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
