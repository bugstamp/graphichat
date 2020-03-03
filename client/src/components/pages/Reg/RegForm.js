import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from '../../common/Form/Form';
import formConfig from '../../common/Form/formConfig';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import RegFormStepper from './RegFormStepper';
import TopProgressLine from '../../common/TopProgressLine';

import {
  FormWrapper,
  FormHeader,
  FormInfo,
  FormFooter,
} from './styled';
import { mutationProps } from '../../propTypes';

const SignUp = ({
  steps,
  activeStep,
  completed,
  signUpAsyncValidationUsername,
  signUpAsyncValidationEmail,
  signUp,
  signUpCompletion,
  signUpBySocial,
}) => {
  const loading = signUp.result.loading || signUpCompletion.result.loading;
  const asyncValidationFields = [{
    name: 'username',
    validation: signUpAsyncValidationUsername,
  }, {
    name: 'email',
    validation: signUpAsyncValidationEmail,
  }];

  return (
    <FormWrapper elevation={8}>
      <TopProgressLine loading={loading} />
      <FormHeader variant="h1" color="primary" align="center" gutterBottom>
        <RegFormStepper activeStep={activeStep} steps={steps} />
      </FormHeader>
      <Choose>
        <When condition={completed}>
          <FormInfo>
            Your account had been successfuly completed.Check your email and confirm registration.
          </FormInfo>
        </When>
        <When condition={activeStep === 0}>
          <Form
            {...formConfig('signUpStepOne')}
            mutation={signUp.mutation}
            result={signUp.result}
            submitButtonText="Confirm"
            asyncValidationFields={asyncValidationFields}
          />
          <SocialMedia
            mutation={signUpBySocial.mutation}
            result={signUpBySocial.result}
          />
        </When>
        <When condition={activeStep === 1}>
          <Form
            {...formConfig('signUpStepTwo')}
            mutation={signUpCompletion.mutation}
            result={signUpCompletion.result}
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

SignUp.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  signUpAsyncValidationUsername: PropTypes.shape(mutationProps).isRequired,
  signUpAsyncValidationEmail: PropTypes.shape(mutationProps).isRequired,
  signUp: PropTypes.shape(mutationProps).isRequired,
  signUpCompletion: PropTypes.shape(mutationProps).isRequired,
  signUpBySocial: PropTypes.shape(mutationProps).isRequired,
};

export default SignUp;
