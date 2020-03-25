import React from 'react';
import { act } from 'react-dom/test-utils';
// import { shallow } from 'enzyme';
import wait from 'waait';

import RegForm from './RegForm';
import RegFormStepper from './RegFormStepper';
import {
  FormWrapper,
  FormHeader,
  FormFooter,
} from './styled';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import {
  signUpMock,
  signUpCompletionMock,
  signUpBySocialMock,
  signUpAsyncValidationMock,
  signUpBySocialMockWithErrors,
} from '../../../__mocks__/mockedQueries';
import {
  tokens,
  signUpForm,
  signUpCompletionForm,
  socialProfile,
  socialUserProfile,
} from '../../../__mocks__/mockedQueryData';
import { BadInputError } from '../../../__mocks__/mockedErrors';
import { fixReactFacebookLoginBug } from '../../../__mocks__/testUtils';

const defaultMocks = [
  signUpMock,
  signUpCompletionMock,
  signUpBySocialMock,
  signUpAsyncValidationMock,
];

describe('RegForm', () => {
  fixReactFacebookLoginBug();

  let activeStep = 0;
  let isCompleted = false;
  const onCompletedMock = jest.fn(data => data);
  const onSuccessMock = jest.fn(() => onCompletedMock);
  const onErrorMock = jest.fn(error => error);

  const mountWrapper = (mocks = defaultMocks, options = {}) => mountMockedProvider(
    <RegForm
      activeStep={activeStep}
      isCompleted={isCompleted}
      onSuccess={onSuccessMock}
      onError={onErrorMock}
    />,
    mocks,
    options,
  );

  const signUpVariables = { variables: { form: signUpForm } };
  const signUpResult = { signUp: tokens };
  const signUpCompletionVariables = { variables: { form: signUpCompletionForm } };
  const signUpCompletionResult = { signUpCompletion: tokens };
  const signUpBySocialVariables = {
    variables: {
      social: socialProfile,
      profile: socialUserProfile,
    },
  };
  const signUpBySocialResult = { signUpBySocial: tokens };
  const mutationError = new BadInputError();

  test('should mount without errors', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('RegForm')).toHaveLength(1);
  });
  test('should have FormWrapper with correct props', () => {
    const wrapper = mountWrapper();
    const FormWrapperTest = wrapper.find(FormWrapper);

    expect(FormWrapperTest).toHaveLength(1);
    expect(FormWrapperTest.prop('elevation')).toEqual(8);
  });
  test('should have FormHeader with correct props', () => {
    const wrapper = mountWrapper();
    const FormHeaderTest = wrapper.find(FormHeader);

    expect(FormHeaderTest).toHaveLength(1);
    expect(FormHeaderTest.props()).toMatchObject({
      variant: 'h1',
      color: 'primary',
      align: 'center',
      gutterBottom: true,
    });
  });
  test('should have FormHeader with correct props', () => {
    const wrapper = mountWrapper();
    const FormWrapperTest = wrapper.find(FormWrapper);

    expect(FormWrapperTest).toHaveLength(1);
    expect(FormWrapperTest.prop('elevation')).toEqual(8);
  });
  test('should pass activeStep to RegFormStepper', () => {
    const wrapper = mountWrapper();
    const RegFormStepperTest = wrapper.find(RegFormStepper);

    expect(RegFormStepperTest).toHaveLength(1);
    expect(RegFormStepperTest.prop('activeStep')).toEqual(activeStep);
  });
  test('shouldn\'t show FormInfo when isCompleted condition is equal to false', () => {
    const wrapper = mountWrapper();
    const FormInfoTest = wrapper.find('FormInfo');

    expect(FormInfoTest).toHaveLength(0);
  });
  test('should mount signUp step one form when activeStep condition is equal to 0', () => {
    const wrapper = mountWrapper();
    const FormTest = wrapper.find('Form');

    expect(FormTest).toHaveLength(1);
    expect(FormTest.props()).toMatchObject({
      formId: 'signUpStepOne',
      submitButtonText: 'Confirm',
    });
  });
  test('signUp mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('Form').prop('mutation');

    expect(mutation).toBeDefined();

    await act(async () => {
      mutation(signUpVariables);

      await wait(100);
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(signUpResult);
      expect(wrapper.find('Form').props().result.data).toMatchObject(signUpResult);
    });
  });
  test('signUpBySocial mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('SocialMedia').prop('mutation');

    expect(mutation).toBeDefined();
    expect(wrapper.find('SocialMedia').prop('result').loading).toBeFalsy();

    await act(async () => {
      mutation(signUpBySocialVariables);

      await wait();
      wrapper.update();
      expect(wrapper.find('SocialMedia').prop('result').loading).toBeTruthy();

      await wait();
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(signUpBySocialResult);
      expect(wrapper.find('SocialMedia').prop('result').data).toMatchObject(signUpBySocialResult);
    });
  });
  test('signInBySocial mutation with errors', async () => {
    const wrapper = mountWrapper([signUpBySocialMockWithErrors]);
    const mutation = wrapper.find('SocialMedia').prop('mutation');

    await act(async () => {
      mutation(signUpBySocialVariables);

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
  test('should mount sign up step two form when activeStep condition is equal to 1', () => {
    activeStep = 1;
    const wrapper = mountWrapper();
    const FormTest = wrapper.find('Form');

    expect(FormTest).toHaveLength(1);
    expect(FormTest.props()).toMatchObject({
      formId: 'signUpStepTwo',
      submitButtonText: 'Confirm',
    });
  });
  test('signUpCompletion mutation', async () => {
    const wrapper = mountWrapper();
    const mutation = wrapper.find('Form').prop('mutation');

    expect(mutation).toBeDefined();

    await act(async () => {
      mutation(signUpCompletionVariables);

      await wait(100);
      wrapper.update();
      expect(onCompletedMock).toBeCalledWith(signUpCompletionResult);
      expect(wrapper.find('Form').props().result.data).toMatchObject(signUpCompletionResult);
    });
  });
  test('should have FormFooter', () => {
    const wrapper = mountWrapper();
    const FormFooterTest = wrapper.find(FormFooter);

    expect(FormFooterTest).toHaveLength(1);
    expect(FormFooterTest.prop('align')).toMatch('center');
  });
  test('FormFooter should have Link with correct path', () => {
    const wrapper = mountWrapper();
    const FormFooterTest = wrapper.find(FormFooter);

    expect(FormFooterTest.find('Link')).toHaveLength(1);
    expect(FormFooterTest.find('Link').prop('to')).toMatch('/login');
  });
});
