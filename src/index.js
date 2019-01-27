import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-token': localStorage.getItem('chatkilla_token') || null,
      'x-refresh-token': localStorage.getItem('chatkilla_refresh_token') || null,
    },
  }));
  console.log('before', operation);

  return forward(operation);
});

const afterwareMiddleware = new ApolloLink((operation, forward) => {
  forward(operation).map((response) => {
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

const client = new ApolloClient({
  link: afterwareMiddleware.concat(
    from([
      authMiddleware,
      httpLink,
    ]),
  ),
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
