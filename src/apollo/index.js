import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  credentials: 'include',
});
const initialState = {
  me: null,
  contacts: [],
};

const initData = (data) => {
  cache.writeData({ data });
};
initData(initialState);

client.onResetStore(() => { initData(initialState); });

export default client;
