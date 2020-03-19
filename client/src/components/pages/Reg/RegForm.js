import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from '../../common/Form/Form';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import RegFormStepper from './RegFormStepper';
import TopProgressLine from '../../common/TopProgressLine';

import {
  FormWrapper,
  FormHeader,
  FormInfo,
  FormFooter,
} from './styled';
import { mutationResultProps } from '../../propTypes';

const RegForm = (props) => {
  const {
    activeStep,
    isCompleted,
    signUpAsyncValidationUsername,
    signUpAsyncValidationUsernameResult,
    signUpAsyncValidationEmail,
    signUpAsyncValidationEmailResult,
    signUp,
    signUpResult,
    signUpCompletion,
    signUpCompletionResult,
    signUpBySocial,
    signUpBySocialResult,
  } = props;
  const loading = signUpResult.loading || signUpCompletionResult.loading;
  const asyncFields = {
    username: {
      mutation: signUpAsyncValidationUsername,
      result: signUpAsyncValidationUsernameResult,
    },
    email: {
      mutation: signUpAsyncValidationEmail,
      result: signUpAsyncValidationEmailResult,
    },
  };

  return (
    <FormWrapper elevation={8}>
      <TopProgressLine loading={loading} />
      <FormHeader variant="h1" color="primary" align="center" gutterBottom>
        <RegFormStepper activeStep={activeStep} />
      </FormHeader>
      <Choose>
        <When condition={isCompleted}>
          <FormInfo>
            Your account had been successfuly completed.Check your email and confirm registration.
          </FormInfo>
        </When>
        <When condition={activeStep === 0}>
          <Form
            formId="signUpStepOne"
            asyncFields={asyncFields}
            mutation={signUp}
            result={signUpResult}
            submitButtonText="Confirm"
          />
          <SocialMedia
            mutation={signUpBySocial}
            result={signUpBySocialResult}
          />
        </When>
        <When condition={activeStep === 1}>
          <Form
            formId="signUpStepTwo"
            mutation={signUpCompletion}
            result={signUpCompletionResult}
            submitButtonText="Confirm"
          />
        </When>
        <Otherwise>
          {null}
        </Otherwise>
      </Choose>
      <FormFooter align="center">
        <Link to="/login">I already have a account</Link>
      </FormFooter>
    </FormWrapper>
  );
};

RegForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  signUpAsyncValidationUsername: PropTypes.func.isRequired,
  signUpAsyncValidationUsernameResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpAsyncValidationEmail: PropTypes.func.isRequired,
  signUpAsyncValidationEmailResult: PropTypes.shape(mutationResultProps).isRequired,
  signUp: PropTypes.func.isRequired,
  signUpResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpCompletion: PropTypes.func.isRequired,
  signUpCompletionResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpBySocial: PropTypes.func.isRequired,
  signUpBySocialResult: PropTypes.shape(mutationResultProps).isRequired,
};

export default RegForm;
