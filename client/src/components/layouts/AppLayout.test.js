import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow } from 'enzyme';

import {
  getInitialDataMock,
  userUpdateSubscriptionMock,
  userActivitySubscriptionMock,
  chatCreatedSubscriptionMock,
  checkSessionExpirationMock,
} from '../../__mocks__/mockedQueries';
import {
  me,
} from '../../__mocks__/mockedQueryData';
import { mountMockedProvider } from '../../__mocks__/mockedProvider';

import { AppLayout } from './AppLayout';
import Main from '../pages/Main/Main';

const mocks = [
  getInitialDataMock,
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
  test('mount render | check default type of children prop', async () => {
    const wrapper = mountMockedProvider((
      <AppLayout />
    ), mocks);

    expect(wrapper.find(Main)).toBeTruthy();
    expect(wrapper.find(AppLayout).prop('children')).toBe(null);

    await act(async () => {
      wrapper.update();
    });
  });
  test('pass child', async () => {
    const wrapper = mountMockedProvider((
      <AppLayout><TestChild /></AppLayout>
    ), mocks);

    expect(wrapper.find(TestChild)).toBeTruthy();
    expect(wrapper.find(TestChild).text()).toBe(text);

    await act(async () => {
      wrapper.update();
    });
  });
  test('getInitialData query', async () => {
    const wrapper = mountMockedProvider((
      <AppLayout />
    ), mocks);
    expect(wrapper.find(Main).prop('loading')).toBe(true);

    await act(async () => {
      await wait();
      wrapper.update();
      expect(wrapper.find(Main).prop('loading')).toBe(false);
      expect(wrapper.find(Main).prop('userId')).toBe(me.id);
    });
  });
});
