import { ApolloLink, from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createUploadLink } from 'apollo-upload-client';
import { isEmpty } from 'lodash';

import storage from '../storage';
import { forceLogout } from './utils';

const httpLink = createUploadLink({
  uri: process.env.APOLLO_URL,
});
const wsClient = new SubscriptionClient(process.env.WS_URL, {
  reconnect: true,
});

const subscriptionMiddleware = {
  applyMiddleware: async (options, next) => {
    options.tokens = storage.getTokens();
    next();
  },
};

const wsLink = new WebSocketLink(wsClient);
wsLink.subscriptionClient.use([subscriptionMiddleware]);

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
  const context = operation.getContext();

  if ('response' in context) {
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token && refreshToken) {
        storage.setTokens(token, refreshToken);
      }
    }
  }
  return response;
}));

const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
  if (networkError.statusCode === 401) {
    forceLogout();
  }

  if (process.env.NODE_ENV === 'development') {
    if (!isEmpty(networkError)) {
      console.log(networkError);
    }
    if (!isEmpty(graphQLErrors)) {
      console.log(graphQLErrors);
    }
  }
});

const logger = new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  console.log(`log operation: ${operationName}`, operation);
  return forward(operation).map((response) => {
    console.log(`log operation result ${operationName}:`, response);
    return response;
  });
});

const links = [
  authLink,
  tokenLink,
  errorLink,
  networkLink,
];

if (process.env.NODE_ENV === 'development') {
  links.splice(2, 0, logger);
}

const link = from(links);

export default link;
