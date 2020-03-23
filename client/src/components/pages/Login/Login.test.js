import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Drawer from '@material-ui/core/Drawer';

import { Login } from './Login';
import LoginPresentation from './LoginPresentation';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';
import { LoginWrapper } from './styled';

import storage from '../../../storage';

import mockedUseMediaQuery from '../../../__mocks__/@material-ui/core/useMediaQuery';
import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import { checkSessionExpirationMock } from '../../../__mocks__/mockedQueries';
import { tokens } from '../../../__mocks__/mockedQueryData';
import historyMock, { historyPushMock } from '../../../__mocks__/historyMock';
import useHookMock from '../../../__mocks__/useHookMock';
import { fixReactFacebookLoginBug } from '../../../__mocks__/testUtils';

const defaultMocks = [checkSessionExpirationMock];

describe('Login', () => {
  fixReactFacebookLoginBug();

  const toggleNotificationMock = jest.fn();
  const setStateMock = jest.fn();
  const useStateMock = jest.fn(() => [true, setStateMock]);

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <Login history={historyMock} toggleNotification={toggleNotificationMock} />,
    mocks,
    options,
  );

  afterEach(() => {
    jest.clearAllMocks();
    storage.removeTokens();
  });

  test('should be mount without errors | intitial form state should be false', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('Login')).toHaveLength(1);
    expect(wrapper.find('LoginForm')).toHaveLength(0);
  });
  test('LoginWrapper should have container prop', () => {
    const wrapper = mountWrapper();
    const LoginWrapperTest = wrapper.find(LoginWrapper);

    expect(LoginWrapperTest).toHaveLength(1);
    expect(LoginWrapperTest.prop('container')).toBeTruthy();
  });
  test('toggleForm useState hook', async () => {
    const wrapper = mountWrapper();
    const LoginPresentationWrapper = wrapper.find(LoginPresentation);
    expect(LoginPresentationWrapper.prop('stopAnimation')).toBe(false);

    await act(async () => {
      LoginPresentationWrapper.prop('toggleForm')();

      await wait();
      wrapper.update();

      expect(wrapper.find(LoginPresentation).prop('stopAnimation')).toBe(true);
      expect(wrapper.find('LoginForm')).toHaveLength(1);
    });
  });
  test('toggleNotification should be called when initial sessionExpired state is true', () => {
    mountWrapper(null, { state: { sessionExpired: true } });

    expect(toggleNotificationMock).toBeCalledWith('Session time was expired');
  });
  test('Drawer should have correct props', () => {
    const wrapper = mountWrapper();
    const DrawerWrapper = wrapper.find(Drawer);

    expect(DrawerWrapper).toHaveLength(1);
    expect(DrawerWrapper.props()).toMatchObject({
      open: false,
      anchor: 'right',
    });
    expect(DrawerWrapper.prop('onClose')).toEqual(expect.any(Function));
  });
  test('Drawer should mount when useMediaQuery returns true', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(Drawer)).toHaveLength(1);
  });
  test('FullWidthSwipeableDrawer should mount when useMediaQuery returns false', () => {
    mockedUseMediaQuery.mockImplementation(() => false);
    const wrapper = mountWrapper();

    expect(wrapper.find(FullWidthSwipeableDrawer)).toHaveLength(1);
  });
  test('redirect to sign up page', async () => {
    useHookMock('useState', useStateMock);
    const wrapper = mountWrapper();

    await act(async () => {
      const redirectToSignUp = wrapper.find('LoginForm').prop('redirectToSignUp');

      expect(redirectToSignUp).toEqual(expect.any(Function));
      redirectToSignUp();
      expect(historyPushMock).toBeCalledWith('/reg');
    });
  });
  test('storage should save the tokens and history should redirect to main page when handleSuccess is invoked', async () => {
    useHookMock('useState', useStateMock);
    const wrapper = mountWrapper();
    const onSuccess = wrapper.find('LoginForm').prop('onSuccess');

    expect(onSuccess).toEqual(expect.any(Function));

    await act(async () => {
      onSuccess('signIn')({ signIn: tokens });

      expect(storage.getTokens()).toMatchObject(tokens);
      expect(historyPushMock).toBeCalledWith('/');
    });
  });
  test('handleError should invoke toggleNotification with error message', async () => {
    useHookMock('useState', useStateMock);
    const wrapper = mountWrapper();
    const message = 'Invalid field';
    const onError = wrapper.find('LoginForm').prop('onError');

    expect(onError).toEqual(expect.any(Function));

    await act(async () => {
      onError({ graphQLErrors: [{ message, data: { invalidField: null } }] });

      expect(toggleNotificationMock).toBeCalledWith(message);
    });
  });
});
