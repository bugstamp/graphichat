import React from 'react';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mount } from 'enzyme';

import { initialState } from '../apollo/cache';
import { theme } from '../styles';

// eslint-disable-next-line
const TestProvider = ({ children, mocks, cache, history }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={mocks} cache={cache}>
        <Router history={history}>
          {children}
        </Router>
      </MockedProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export const mountMockedProvider = (children, mocks = [], {
  history = createMemoryHistory(),
} = {}) => {
  const cache = new InMemoryCache({});
  cache.writeData({ data: initialState });

  return mount((
    <TestProvider mocks={mocks} cache={cache} history={history}>
      {children}
    </TestProvider>
  ));
};

export default TestProvider;
