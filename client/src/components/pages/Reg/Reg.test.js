import config from 'config';
import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import jwt from 'jsonwebtoken';

import { Reg } from './Reg';
import RegPresentation from './RegPresentation';
import { RegWrapper } from './styled';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import { checkSessionExpirationMock } from '../../../__mocks__/mockedQueries';
import { tokens } from '../../../__mocks__/mockedQueryData';
import historyMock, { historyPushMock } from '../../../__mocks__/historyMock';
import { fixReactFacebookLoginBug } from '../../../__mocks__/testUtils';

import storage from '../../../storage';

const { tokenSecrets } = config;
const defaultMocks = [checkSessionExpirationMock];

describe('Reg', () => {
  fixReactFacebookLoginBug();

  let locationMock = {
    search: '',
  };
  const toggleNotificationMock = jest.fn();
  const mockToken = {
    data: {
      regStatus: 'COMPLETED',
    },
  };
  const token = jwt.sign(mockToken, tokenSecrets.token);

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <Reg
      location={locationMock}
      history={historyMock}
      toggleNotification={toggleNotificationMock}
    />,
    mocks,
    options,
  );

  afterEach(() => {
    jest.clearAllMocks();
    storage.removeTokens();
  });

  test('should mount without errors', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('Reg')).toHaveLength(1);
  });
  test('RegWrapper should have container prop', () => {
    const wrapper = mountWrapper();
    const RegWrapperTest = wrapper.find(RegWrapper);

    expect(RegWrapperTest).toHaveLength(1);
    expect(RegWrapperTest.prop('container')).toBeTruthy();
  });
  test('should have RegPresentation', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(RegPresentation)).toHaveLength(1);
  });
  test('RegForm should have correct props', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('RegForm')).toHaveLength(1);

    const props = wrapper.find('RegForm').props();
    expect(props).toMatchObject({
      activeStep: 0,
      isCompleted: false,
    });
    expect(props.onSuccess).toEqual(expect.any(Function));
    expect(props.onError).toEqual(expect.any(Function));
  });

  describe('componentDidMount', () => {
    test('should passed first step when mounted with token in the location search string', async () => {
      await act(async () => {
        locationMock = {
          search: `?token=${token}`,
        };
        const wrapper = mountWrapper();

        await wait();
        wrapper.update();

        expect(wrapper.find('RegForm').prop('activeStep')).toEqual(1);
      });
    });
    test('should redirect to reg page when mounted with invalid token in the location search string', async () => {
      await act(async () => {
        locationMock = {
          search: '?token=234324',
        };
        mountWrapper();
        await wait();

        expect(historyPushMock).toBeCalledWith('/reg');
      });
    });
  });
  describe('onSuccess callback', () => {
    test('should save tokens in the storage and redirect to main page when called with tokens', async () => {
      await act(async () => {
        const wrapper = mountWrapper();
        const onSuccess = wrapper.find('RegForm').prop('onSuccess');
        onSuccess('signUp')({ signUp: tokens });

        await wait();

        expect(storage.getTokens()).toEqual(tokens);
        expect(historyPushMock).toBeCalledWith('/');
      });
    });
    test('should set completed reg status when called without tokens', async () => {
      await act(async () => {
        const wrapper = mountWrapper();
        const onSuccess = wrapper.find('RegForm').prop('onSuccess');
        onSuccess('signUp')({ signUp: true });

        await wait();
        wrapper.update();

        expect(wrapper.find('RegForm').prop('isCompleted')).toEqual(true);
      });
    });
  });
  test('onError callback should invoke toggleNotification with error message', async () => {
    const wrapper = mountWrapper();
    const message = 'Invalid field';
    const onError = wrapper.find('RegForm').prop('onError');

    expect(onError).toEqual(expect.any(Function));

    await act(async () => {
      onError({ graphQLErrors: [{ message, data: { invalidField: null } }] });

      expect(toggleNotificationMock).toBeCalledWith(message);
    });
  });
});
