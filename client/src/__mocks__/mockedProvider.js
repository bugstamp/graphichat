import React from 'react';
import { InMemoryCache } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
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
      <MockedProvider mocks={mocks} cache={cache} addTypename={true}>
        <Router history={history}>
          {children}
        </Router>
      </MockedProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export const mountMockedProvider = (children, mocks = [], {
  history = createMemoryHistory(),
  state = null,
} = {}) => {
  const cache = new InMemoryCache({});
  cache.writeData({ data: state || initialState });

  return mount((
    <TestProvider
      mocks={mocks}
      cache={cache}
      history={history}
    >
      {children}
    </TestProvider>
  ));
};

export default TestProvider;
