import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import {} from 'lodash';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

const httpLink = createHttpLink({
  uri: process.env.APOLLO_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('chatkilla_tkn') || null,
      'x-refresh-token': localStorage.getItem('chatkilla_rfrsh_tkn') || null,
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
      localStorage.setItem('chatkilla_tkn', token);
      localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);
    }
  }
  return response;
}));

// const errorLink = onError(({ networkError = {}, graphQLErrors, response, operation }) => {
//   console.log('networkerrors', networkError);
//   console.log('error', graphQLErrors);
// });

const logger = new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  console.log(`log operation: ${operationName}`, operation);
  return forward(operation).map((response) => {
    console.log(`log operation result ${operationName}:`, response);
    return response;
  });
});

const client = new ApolloClient({
  link: from([
    // errorLink,
    authLink,
    tokenLink,
    logger,
    httpLink,
  ]),
  credentials: 'include',
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
