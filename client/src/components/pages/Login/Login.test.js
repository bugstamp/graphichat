import React from 'react';
import { act } from 'react-dom/test-utils';
// import { shallow } from 'enzyme';
// import wait from 'waait';

import Drawer from '@material-ui/core/Drawer';

import { Login } from './Login';
import LoginPresentation from './LoginPresentation';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import {
  signInMock,
  signInBySocialMock,
  checkSessionExpirationMock,
} from '../../../__mocks__/mockedQueries';
import useHookMock from '../../../__mocks__/useHookMock';
import mockedUseMediaQuery from '../../../__mocks__/@material-ui/core/useMediaQuery';

const defaultMocks = [
  checkSessionExpirationMock,
  signInMock,
  signInBySocialMock,
];

describe('Login', () => {
  // fix bug with react-facebook-login lib
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  const historyPushMock = jest.fn(str => str);
  const historyMock = {
    push: historyPushMock,
  };
  const toggleNotificationMock = jest.fn();
  const setStateMock = jest.fn();
  const callbackMock = jest.fn();

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <Login history={historyMock} toggleNotification={toggleNotificationMock} />,
    mocks,
    options,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('match to snapshot', () => {
  //   const wrapper = shallow((
  //     <Login
  //       history={historyMock}
  //       toggleNotification={toggleNotificationMock}
  //     />
  //   ));
  //
  //   expect(wrapper).toMatchSnapshot();
  // });
  test('mount should be without errors and intitial form state should be false', async () => {
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find('Login')).toHaveLength(1);
      expect(wrapper.find('LoginForm')).toHaveLength(0);
    });
  });
  test('form state should be correctly passed to LoginPresentation component', async () => {
    useHookMock('useState', [true, setStateMock]);
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find(LoginPresentation).prop('stopAnimation')).toBe(true);
    });
  });
  test('LoginForm should be rendered when form state is true', async () => {
    useHookMock('useState', [true, setStateMock]);
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find('LoginForm')).toHaveLength(1);
    });
  });
  test('toggleNotification should be called when initial sessionExpired state is true', async () => {
    const options = {
      state: {
        sessionExpired: true,
      },
    };
    mountWrapper(null, options);

    await act(async () => {
      expect(toggleNotificationMock).toBeCalledWith('Session time was expired');
    });
  });
  test('useCallback should return handleToggleForm and pass it to child', async () => {
    useHookMock('useCallback', callbackMock);
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find(Drawer).prop('onClose')).toBe(callbackMock);
    });
  });
  test('Drawer should mount initialy and when useMediaQuery returns true', async () => {
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find(Drawer)).toHaveLength(1);
    });
  });
  test('FullWidthSwipeableDrawer should mount when useMediaQuery returns false', async () => {
    mockedUseMediaQuery.mockImplementation(() => false);
    const wrapper = mountWrapper();

    await act(async () => {
      expect(wrapper.find(FullWidthSwipeableDrawer)).toHaveLength(1);
    });
  });
  test('redirect to sign up page', async () => {
    useHookMock('useState', [true, setStateMock]);
    const wrapper = mountWrapper();

    await act(async () => {
      const redirectToSignUp = wrapper.find('LoginForm').prop('redirectToSignUp');
      expect(redirectToSignUp).toEqual(expect.any(Function));
      redirectToSignUp();
      expect(historyPushMock).toBeCalledWith('/reg');
    });
  });
});
