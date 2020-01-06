import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import AppProvider from './context/AppProvider';
import Router from '../router';

const App = ({ theme }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Router />
        </AppProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default hot(module)(App);
