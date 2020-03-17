import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

import LoginForm from './LoginForm';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import {
  signInMock,
  signInMockWithErrors,
  signInBySocialMock,
  signInBySocialMockWithErrors,
} from '../../../__mocks__/mockedQueries';
import {
  signInForm,
  tokens,
  socialProfile,
  socialUserProfile,
} from '../../../__mocks__/mockedQueryData';
import { BadInputError } from '../../../__mocks__/mockedErrors';
import { Header, SignUpButton } from './styled';
import { fixReactFacebookLoginBug } from '../../../__mocks__/testUtils';

const defaultMocks = [
  signInMock,
  signInBySocialMock,
  signInMockWithErrors,
];

describe('LoginForm', () => {
  fixReactFacebookLoginBug();

  const onCompletedMock = jest.fn(data => data);
  const onSuccessMock = jest.fn(() => onCompletedMock);
  const onErrorMock = jest.fn(error => error);
  const redirectToSignUpMock = jest.fn();

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <LoginForm
      onSuccess={onSuccessMock}
      onError={onErrorMock}
      redirectToSignUp={redirectToSignUpMock}
    />,
    mocks,
    options,
  );

  test('should mount without errors', async () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });
  test('Header should have correct props', async () => {
    const wrapper = mountWrapper();
    const HeaderTest = wrapper.find(Header);

    expect(HeaderTest).toHaveLength(1);
    expect(HeaderTest.prop('variant')).toBe('h1');
    expect(HeaderTest.prop('color')).toBe('primary');
    expect(HeaderTest.prop('align')).toBe('center');
    expect(HeaderTest.prop('gutterBottom')).toBeTruthy();
  });
  test('AccountCircleIcon should have correct props', async () => {
    const wrapper = mountWrapper();
    const AccountCircleIconTest = wrapper.find(AccountCircleIcon);

    expect(AccountCircleIconTest).toHaveLength(1);
    expect(AccountCircleIconTest.prop('fontSize')).toBe('inherit');
    expect(AccountCircleIconTest.prop('color')).toBe('primary');
  });
  test('Form should have correct props', async () => {
    const wrapper = mountWrapper();
    const Form = wrapper.find('Form');

    expect(Form).toHaveLength(1);
    expect(Form.prop('formId')).toBe('signIn');
    expect(Form.prop('submitButtonText')).toBe('Sign In');
  });
  test('SignUpButton should have correct props', async () => {
    const wrapper = mountWrapper();
    const Button = wrapper.find(SignUpButton);

    expect(Button).toHaveLength(1);
    expect(Button.prop('onClick')).toBe(redirectToSignUpMock);
    expect(Button.prop('color')).toBe('primary');
    expect(Button.prop('size')).toBe('large');
    expect(Button.prop('variant')).toBe('outlined');
    expect(Button.prop('fullWidth')).toBeTruthy();
    expect(Button.text()).toBe('Sign Up');
  });
  test('onSuccess should be called twice initially with correct values', async () => {
    mountWrapper();

    expect(onSuccessMock).toHaveBeenCalledTimes(2);
    expect(onSuccessMock.mock.calls).toEqual([['signIn'], ['signInBySocial']]);
  });
  test('signIn mutation', async () => {
    const wrapper = mountWrapper();
    const signInMutation = wrapper.find('Form').prop('mutation');
    const data = { form: signInForm };
    const result = { signIn: tokens };

    expect(signInMutation).toBeDefined();
    expect(wrapper.find('TopProgressLine').prop('loading')).toBeFalsy();

    await act(async () => {
      signInMutation({ variables: data });

      await wait();
      wrapper.update();
      expect(wrapper.find('TopProgressLine').prop('loading')).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(result);
      expect(wrapper.find('Form').props().result.data).toMatchObject(result);
    });
  });
  test('signIn mutation with errors', async () => {
    const wrapper = mountWrapper([signInMockWithErrors]);
    const mutation = wrapper.find('Form').prop('mutation');
    const data = { form: signInForm };
    const error = new BadInputError();

    await act(async () => {
      mutation({ variables: data });

      await wait();
      wrapper.update();
      expect(wrapper.find('Form').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onErrorMock).toBeCalled();
      expect(wrapper.find('Form').prop('result').error).toBeInstanceOf(Error);
      expect(wrapper.find('Form').prop('result').error.graphQLErrors[0]).toEqual(error);
    });
  });
  test('signInBySocial mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('SocialMedia').prop('mutation');
    const data = {
      social: socialProfile,
      profile: socialUserProfile,
    };
    const result = { signInBySocial: tokens };

    expect(mutation).toBeDefined();
    expect(wrapper.find('SocialMedia').prop('result').loading).toBeFalsy();

    await act(async () => {
      mutation({ variables: data });

      await wait();
      wrapper.update();
      expect(wrapper.find('SocialMedia').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(result);
      expect(wrapper.find('SocialMedia').prop('result').data).toMatchObject(result);
    });
  });
  test('signInBySocial mutation with errors', async () => {
    const wrapper = mountWrapper([signInBySocialMockWithErrors]);
    const mutation = wrapper.find('SocialMedia').prop('mutation');
    const data = {
      social: socialProfile,
      profile: socialUserProfile,
    };
    const error = new BadInputError();

    await act(async () => {
      mutation({ variables: data });

      await wait();
      wrapper.update();
      expect(wrapper.find('SocialMedia').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onErrorMock).toBeCalled();
      expect(wrapper.find('SocialMedia').prop('result').error).toBeInstanceOf(Error);
      expect(wrapper.find('SocialMedia').prop('result').error.graphQLErrors[0]).toEqual(error);
    });
  });
});
