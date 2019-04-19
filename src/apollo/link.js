import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import storage from '../actions/storage';

const httpLink = createHttpLink({
  uri: process.env.APOLLO_URL,
});

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

const errorLink = onError(({ networkError = {}, graphQLErrors, response, operation }) => {
  console.log('networkerrors', networkError);
  console.log('error', graphQLErrors);
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
  errorLink,
  authLink,
  tokenLink,
  logger,
  httpLink,
]);

export default link;
