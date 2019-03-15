import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';

const client = new ApolloClient({
  link,
  credentials: 'include',
  cache: new InMemoryCache(),
});

export default client;
