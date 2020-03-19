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

  const signInVariables = { variables: { form: signInForm } };
  const signInResult = { signIn: tokens };
  const signInBySocialVariables = {
    variables: {
      social: socialProfile,
      profile: socialUserProfile,
    },
  };
  const signInBySocialResult = { signInBySocial: tokens };
  const mutationError = new BadInputError();

  test('should mount without errors', async () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });
  test('Header props', async () => {
    const wrapper = mountWrapper();
    const HeaderTest = wrapper.find(Header);

    expect(HeaderTest).toHaveLength(1);
    expect(HeaderTest.props()).toMatchObject({
      variant: 'h1',
      color: 'primary',
      align: 'center',
      gutterBottom: true,
    });
  });
  test('AccountCircleIcon props', async () => {
    const wrapper = mountWrapper();
    const AccountCircleIconTest = wrapper.find(AccountCircleIcon);

    expect(AccountCircleIconTest).toHaveLength(1);
    expect(AccountCircleIconTest.props()).toMatchObject({
      fontSize: 'inherit',
      color: 'primary',
    });
  });
  test('Form props', async () => {
    const wrapper = mountWrapper();
    const Form = wrapper.find('Form');

    expect(Form).toHaveLength(1);
    expect(Form.props()).toMatchObject({
      formId: 'signIn',
      submitButtonText: 'Sign In',
    });
  });
  test('SignUpButton props', async () => {
    const wrapper = mountWrapper();
    const Button = wrapper.find(SignUpButton);

    expect(Button).toHaveLength(1);
    expect(Button.props()).toMatchObject({
      onClick: redirectToSignUpMock,
      color: 'primary',
      size: 'large',
      variant: 'outlined',
      fullWidth: true,
      children: 'Sign Up',
    });
  });
  test('onSuccess should be called initially with correct mutation ids', async () => {
    mountWrapper();

    expect(onSuccessMock).toHaveBeenCalledTimes(2);
    expect(onSuccessMock.mock.calls).toEqual([['signIn'], ['signInBySocial']]);
  });
  test('signIn mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('Form').prop('mutation');

    expect(mutation).toBeDefined();
    expect(wrapper.find('TopProgressLine').prop('loading')).toBeFalsy();

    await act(async () => {
      mutation(signInVariables);

      await wait();
      wrapper.update();
      expect(wrapper.find('TopProgressLine').prop('loading')).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(signInResult);
      expect(wrapper.find('Form').props().result.data).toMatchObject(signInResult);
    });
  });
  test('signIn mutation with errors', async () => {
    const wrapper = mountWrapper([signInMockWithErrors]);
    const mutation = wrapper.find('Form').prop('mutation');

    await act(async () => {
      mutation(signInVariables);

      await wait();
      wrapper.update();
      expect(wrapper.find('Form').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onErrorMock).toBeCalled();
      expect(wrapper.find('Form').prop('result').error).toBeInstanceOf(Error);
      expect(wrapper.find('Form').prop('result').error.graphQLErrors[0]).toEqual(mutationError);
    });
  });
  test('signInBySocial mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('SocialMedia').prop('mutation');

    expect(mutation).toBeDefined();
    expect(wrapper.find('SocialMedia').prop('result').loading).toBeFalsy();

    await act(async () => {
      mutation(signInBySocialVariables);

      await wait();
      wrapper.update();
      expect(wrapper.find('SocialMedia').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(signInBySocialResult);
      expect(wrapper.find('SocialMedia').prop('result').data).toMatchObject(signInBySocialResult);
    });
  });
  test('signInBySocial mutation with errors', async () => {
    const wrapper = mountWrapper([signInBySocialMockWithErrors]);
    const mutation = wrapper.find('SocialMedia').prop('mutation');

    await act(async () => {
      mutation(signInBySocialVariables);

      await wait();
      wrapper.update();
      expect(wrapper.find('SocialMedia').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onErrorMock).toBeCalled();
      expect(wrapper.find('SocialMedia').prop('result').error).toBeInstanceOf(Error);
      expect(wrapper.find('SocialMedia').prop('result').error.graphQLErrors[0]).toEqual(mutationError);
    });
  });
});
