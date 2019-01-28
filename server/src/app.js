import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';

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
  context: ({ req, res }) => {
    console.log(res.getHeaders());
    console.log(req.user);
    return {
      db,
      user: req.user,
    };
  },
});
apollo.applyMiddleware({ app });

app.use(express.static(paths.public));
app.use(bodyParser.json());
app.use(passport);
app.use(verification);
app.use(tokenVerification);

app.get('*', (req, res) => {
  res.sendFile(paths.html);
});

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
