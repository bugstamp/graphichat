import { ApolloClient } from 'apollo-client';

import link from './link';
import cache, { initData } from './cache';

const client = new ApolloClient({
  link,
  cache,
  resolvers: {},
  credentials: 'include',
  assumeImmutableResults: true,
});

client.onResetStore(initData);

export default client;
