import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import store from './store';

const renderApp = (Component) => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>, document.getElementById('root'),
  );
};

renderApp(App);
registerServiceWorker();
