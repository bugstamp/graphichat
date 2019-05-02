import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';

import storage from '../actions/storage';
import client from './index';

const httpLink = createHttpLink({
  uri: process.env.APOLLO_URL,
});

const wsLink = new WebSocketLink({
  uri: process.env.WS_URL,
  options: {
    reconnect: true,
    connectionParams: () => ({
      tokens: storage.getTokens(),
    }),
  },
});

const networkLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': storage.token.get(),
      'x-refresh-token': storage.refreshToken.get(),
    },
  });
  return forward(operation);
});

const tokenLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { response: { headers } } = operation.getContext();

  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (token && refreshToken) {
      storage.setTokens(token, refreshToken);
    }
  }
  return response;
}));

const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
  if ((networkError.message || graphQLErrors[0].message) === 'Token is invalid') {
    client.writeData({ data: { sessionExpired: true } });
  }
  console.log('network error', networkError);
  console.log('qraphql errors', graphQLErrors);
});

const logger = new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  console.log(`log operation: ${operationName}`, operation);
  return forward(operation).map((response) => {
    console.log(`log operation result ${operationName}:`, response);
    return response;
  });
});

const link = from([
  authLink,
  tokenLink,
  logger,
  errorLink,
  networkLink,
]);

export default link;
