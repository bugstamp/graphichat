import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000',
});
const client = new ApolloClient({
  link: httpLink,
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
