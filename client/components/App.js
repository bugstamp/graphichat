import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import { size } from 'polished';

import Router from '../router';
import { GlobalStyle, theme } from '../styles';

const Wrapper = styled.div`
  ${size('inherit')}
  display: flex;
  position: relative;
`;

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Wrapper>
            <Router />
          </Wrapper>
        </Fragment>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default hot(module)(App);
