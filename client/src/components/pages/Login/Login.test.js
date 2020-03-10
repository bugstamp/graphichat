import React from 'react';
import { act } from 'react-dom/test-utils';
// import { shallow } from 'enzyme';
import wait from 'waait';

import { Login } from './Login';
import LoginForm from './LoginForm';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import {
  signInMock,
  signInBySocialMock,
  checkSessionExpirationMock,
} from '../../../__mocks__/mockedQueries';

const mocks = [
  checkSessionExpirationMock,
  signInMock,
  signInBySocialMock,
];

const mockUseState = (initialState, mockSetState = jest.fn()) => {
  jest.spyOn(React, 'useState').mockImplementation(() => [initialState, mockSetState]);
};

describe('Login', () => {
  // fix bug with react-facebook-login lib
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  const mockToggleNotification = jest.fn();
  const mockSetState = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('match to snapshot', () => {
  //   const wrapper = shallow(<Login toggleNotification={mockToggleNotification} />);
  //
  //   expect(wrapper).toMatchSnapshot();
  // });
  test('initial mount without errors', async () => {
    const wrapper = mountMockedProvider(
      <Login toggleNotification={mockToggleNotification} />,
      mocks,
    );

    await act(async () => {
      expect(wrapper.find(Login)).toHaveLength(1);
      expect(wrapper.find(LoginForm)).toHaveLength(0);
    });
  });
  test('LoginForm is rendered when form is open', async () => {
    mockUseState(true, mockSetState);
    const wrapper = mountMockedProvider(
      <Login toggleNotification={mockToggleNotification} />,
      mocks,
    );

    await act(async () => {
      expect(wrapper.find(LoginForm)).toHaveLength(1);
    });
  });
  test('show notification when session was expired', async () => {
    mountMockedProvider(<Login toggleNotification={mockToggleNotification} />, mocks, {
      state: {
        sessionExpired: true,
      },
    });

    await act(async () => {
      expect(mockToggleNotification).toBeCalledWith('Session time was expired');
    });
  });
});
