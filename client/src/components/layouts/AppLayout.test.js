import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow } from 'enzyme';

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

const text = 'Test Child';
const TestChild = () => (<div>{text}</div>);

describe('test AppLayout', () => {
  test('snapshot render', () => {
    const wrapper = shallow(<AppLayout />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount render | check default type of children prop', () => {
    const wrapper = mountMockedProvider((
      <AppLayout />
    ), mocks);

    expect(wrapper.find(MainPage)).toBeTruthy();
    expect(wrapper.find(AppLayout).prop('children')).toBe(null);
  });
  test('pass child', () => {
    const wrapper = mountMockedProvider((
      <AppLayout><TestChild /></AppLayout>
    ), mocks);

    expect(wrapper.find(TestChild)).toBeTruthy();
    expect(wrapper.find(TestChild).text()).toBe(text);
  });
});
