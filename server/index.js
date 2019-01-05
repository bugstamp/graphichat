import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import paths from '../webpack/paths';

import db from './db';
import typeDefs from './schema';
import resolvers from './resolvers';

db.connection();

const port = process.env.PORT || 3000;
const app = express();
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

const setResponseTokens = (res, { token, refreshToken }) => {
  res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
  res.set('x-token', token);
  res.set('x-refresh-token', refreshToken);

  return res;
};

app.use(express.static(paths.public));
app.use(async (req, res, next) => {
  const { headers } = req;
  const token = headers['x-token'];
  const refreshToken = headers['x-refresh-token'];

  if (token) {
    try {
      const { user, newTokens } = await db.User.verifyTokens(token, refreshToken);

      if (newTokens) {
        res = setResponseTokens(res, newTokens);
      }

      req.user = user;
    } catch (err) {
      console.log(err);
      req.user = undefined;
    }
  }
  next();
});

app.get('/verification/:regToken', async (reg, res) => {
  const { regToken } = reg.params;

  try {
    const tokens = await db.User.verifySignUp(regToken);

    res = setResponseTokens(res, tokens);
    res.redirect('/');
  } catch (err) {
    res.sendStatus(404);
  }
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
