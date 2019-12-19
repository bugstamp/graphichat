import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import registerSW from './registerSW';

import polyfill from './polyfill';
import ImagePreloader from './components/ImagePreloader';
import App from './components/App';

import apollo from './apollo';
import history from './router/history';
import { GlobalStyle, theme } from './styles';

const renderApp = (Component) => {
  render(
    <ApolloProvider client={apollo}>
      <Fragment>
        <GlobalStyle />
        <ImagePreloader />
        <Router history={history}>
          <Component theme={theme} />
        </Router>
      </Fragment>
    </ApolloProvider>, document.getElementById('root'),
  );
};

polyfill();
renderApp(App);
registerSW();
