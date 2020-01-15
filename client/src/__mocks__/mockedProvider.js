import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';

import { theme } from '../styles';

export const mountMockedProvider = (children, cache, mocks = []) => mount((
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={mocks} cache={cache}>
        {children}
      </MockedProvider>
    </ThemeProvider>
  </MuiThemeProvider>
));
