import express from 'express';
import graphqlMiddleware from 'express-graphql';
import mongoose from 'mongoose';

import schema from './schema';
import resolvers from './resolvers';

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:mna2zcnD7N7DgG7@ds211694.mlab.com:11694/todos', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Couldn\'t connected to mongodb', err);
  }
  console.log('Connected to mongodb');
});

const api = express();

api.all('/graphql', graphqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

export default api;
