import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import Router from '../router';
import { GlobalStyle, theme } from '../styles';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Router />
        </Fragment>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default hot(module)(App);
