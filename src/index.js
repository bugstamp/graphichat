import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import registerSW from './registerSW';

import polyfill from './polyfill';
import App from './components/App';

import apollo from './apollo';
import history from './router/history';

const renderApp = (Component) => {
  render(
    <ApolloProvider client={apollo}>
      <Router history={history}>
        <Component />
      </Router>
    </ApolloProvider>, document.getElementById('root'),
  );
};

polyfill();
renderApp(App);
registerSW();
