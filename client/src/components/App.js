import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';

import Routes from '../router';
import AppProvider from './AppProvider';

import { GlobalStyle } from '../styles';

const App = (props) => {
  const {
    client,
    theme,
    history,
  } = props;

  return (
    <AppProvider client={client} theme={theme}>
      <Fragment>
        <GlobalStyle />
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
};

export default App;
