import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  credentials: 'include',
});

const initialState = {};
const resetData = (data) => {
  cache.writeData({ data });
};

client.onResetStore(() => { resetData(initialState); });

export default client;
