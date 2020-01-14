import React from 'react';
import wait from 'waait';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import {
  getInitialDataMock,
  updateUserMock,
  userUpdateSubscriptionMock,
} from '../../__mocks__/mockedQueries';
import { mountMockedProvider } from '../../__mocks__/mockedProvider';
import queries from '../../queries';

import AppLayout from './AppLayout';
import MainPage from '../pages/MainPage';

describe('test AppLayout', () => {
  test('snapshot render', () => {
    const wrapper = shallow(<AppLayout />);

    expect(wrapper).toMatchSnapshot();
  });
});
