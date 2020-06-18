import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';

import link from './link';
import cache, { initData } from './cache';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
  credentials: 'include',
});

client.onResetStore(initData);

export default client;
