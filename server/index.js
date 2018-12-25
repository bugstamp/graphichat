// import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import paths from '../webpack/paths';

import db from './db';
import typeDefs from './schema';
import resolvers from './resolvers';

// const HTML_PATH = path.resolve(PUBLIC_PATH, './index.html');
db.connection();

const app = express();
const port = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.static(paths.public));
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server is listening on port - ${port}`);
});
