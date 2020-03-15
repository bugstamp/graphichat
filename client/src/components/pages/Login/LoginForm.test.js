import React from 'react';
import { act } from 'react-dom/test-utils';

import LoginForm from './LoginForm';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import {
  signInMock,
  signInBySocialMock,
} from '../../../__mocks__/mockedQueries';

const defaultMocks = [
  signInMock,
  signInBySocialMock,
];

describe('LoginForm', () => {
  // fix bug with react-facebook-login lib
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  const onSuccess = jest.fn();
  const onError = jest.fn();
  const redirectToSignUp = jest.fn();

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <LoginForm onSuccess={onSuccess} onError={onError} redirectToSignUp={redirectToSignUp} />,
    mocks,
    options,
  );

  test('should mount without errors and should have all props', async () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('LoginForm').prop('onSuccess')).toBe(onSuccess);
    expect(wrapper.find('LoginForm').prop('onError')).toBe(onError);
    expect(wrapper.find('LoginForm').prop('redirectToSignUp')).toBe(redirectToSignUp);
  });
});
