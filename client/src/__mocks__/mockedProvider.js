import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { InMemoryCache } from 'apollo-boost';
import { MockedProvider } from '@apollo/react-testing';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { initialState } from '../apollo/cache';
import { theme } from '../styles';

// eslint-disable-next-line
const TestProvider = ({ children, mocks, cache, history }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <MockedProvider
        mocks={mocks}
        cache={cache}
        addTypename={false}
      >
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
  const cache = new InMemoryCache({ addTypename: false });
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
