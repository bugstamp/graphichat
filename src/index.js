import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('chatkilla_token') || null,
    'x-refresh-token': localStorage.getItem('chatkilla_refresh_token') || null,
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();
    console.log('after', operation);

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('chatkilla_token', token);
        localStorage.setItem('chatkilla_refresh_token', refreshToken);
      }
    }
    return response;
  });
});

const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
  console.log(graphQLErrors);
});

const logger = new ApolloLink((operation, forward) => {
  console.log(`operation: ${operation.operationName}`);
  console.log(operation);
  return forward(operation).map((result) => {
    console.log(`Result from ${operation.operationName}:`, result);
    return result;
  })
});

const client = new ApolloClient({
  link: from([
    logger,
    authLink,
    errorLink,
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

const renderApp = (Component) => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>, document.getElementById('root'),
  );
};

renderApp(App);
// registerServiceWorker();
