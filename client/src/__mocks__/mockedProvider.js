import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

export const mountMockedProvider = (children, cache, mocks = []) => mount((
  <MockedProvider mocks={mocks} cache={cache}>
    {children}
  </MockedProvider>
));
