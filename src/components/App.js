import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import AppProvider from './context/AppProvider';
import Router from '../router';
import { GlobalStyle, theme } from '../styles';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Fragment>
            <GlobalStyle />
            <Router />
          </Fragment>
        </AppProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default hot(module)(App);
