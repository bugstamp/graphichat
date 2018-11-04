import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import styled, { ThemeProvider } from 'styled-components';

import Router from '../router';
import { GlobalStyle, theme } from '../styles';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Wrapper>
          <Router />
        </Wrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default hot(module)(App);
