import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import apollo from './apollo';

const renderApp = (Component) => {
  render(
    <ApolloProvider client={apollo}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>, document.getElementById('root'),
  );
};

renderApp(App);
// registerServiceWorker();
