import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

import AppProvider from './AppProvider';
import ImagePreloader from './ImagePreloader';

import { GlobalStyle } from '../styles';

const App = (props) => {
  const {
    client,
    theme,
    history,
    routes: Routes,
  } = props;

  return (
    <AppProvider client={client} theme={theme}>
      <Fragment>
        <GlobalStyle />
        <ImagePreloader />
        <Router history={history}>
          <Routes />
        </Router>
      </Fragment>
    </AppProvider>
  );
};

App.propTypes = {
  client: PropTypes.objectOf(PropTypes.any).isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  routes: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]).isRequired,
};

export default App;
