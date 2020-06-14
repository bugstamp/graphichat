import { ApolloClient } from 'apollo-client';
import { gql } from 'apollo-boost';

import link from './link';
import cache, { initData } from './cache';
import resolvers from './resolvers';

const typeDefs = gql`
  extend type ChatMessage {
    isOptimistic: Boolean
  }
`;

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
  credentials: 'include',
});

client.onResetStore(initData);

export default client;
