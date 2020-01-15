import React from 'react';
import wait from 'waait';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

import {
  getInitialDataMock,
  uploadAvatarMock,
  updateUserMock,
  userUpdateSubscriptionMock,
  userActivitySubscriptionMock,
  chatCreatedSubscriptionMock,
  checkSessionExpirationMock,
} from '../../__mocks__/mockedQueries';
import { mountMockedProvider } from '../../__mocks__/mockedProvider';
import { initialState } from '../../apollo/cache';

import { AppLayout } from './AppLayout';
import MainPage from '../pages/MainPage';

const mocks = [
  getInitialDataMock,
  uploadAvatarMock,
  updateUserMock,
  userUpdateSubscriptionMock,
  userActivitySubscriptionMock,
  checkSessionExpirationMock,
  chatCreatedSubscriptionMock,
];
const cache = new InMemoryCache({ freezeResults: true });
cache.writeData({ data: initialState });

const TestChild = () => (<div>Test</div>);

describe('test AppLayout', () => {
  test('snapshot render', () => {
    const wrapper = shallow(<AppLayout />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount and pass children', () => {
    const wrapper = mountMockedProvider((
      <AppLayout>
        <TestChild />
      </AppLayout>
    ), cache, mocks);

    expect(wrapper.find(MainPage)).toBeTruthy();
    expect(wrapper.find(TestChild)).toBeTruthy();
    expect(wrapper.find(TestChild).text()).toBe('Test');
  });
});
