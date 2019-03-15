import React from 'react';
// import PropTypes from 'prop-types';
// import {} from 'lodash';
import styled from 'styled-components';
// import {} from 'polished';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Form from '../../common/Form/Form';
import formConfig from '../../common/Form/formConfig';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import RegFormStepper from './RegFormStepper';

import { getPadding } from '../../../styles';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    max-width: 375px;
    min-width: 320px;
    padding: ${getPadding(5)} ${getPadding(3)};
  }
`;

const Header = styled(Typography)`
  width: 100%;
  position: relative;
  text-align: center;
`;


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
  return (
    <Wrapper elevation={8}>
      <Header variant="h1" color="primary" align="center" gutterBottom>
        <RegFormStepper activeStep={activeStep} steps={steps} />
      </Header>
      <Choose>
        <When condition={completed}>
          {'Your account had been successfuly completed.Check your email and confirm registration.'}
        </When>
        <When condition={activeStep === 0}>
          <Form
            {...formConfig('signUpStepOne')}
            mutation={signUp.mutation}
            result={signUp.result}
            submitButtonText="Confirm"
            asyncValidationFields={[{
              name: 'username',
              validation: signUpAsyncValidationUsername,
            }, {
              name: 'email',
              validation: signUpAsyncValidationEmail,
            }]}
          />
          <SocialMedia
            mutation={signUpBySocial.mutation}
            result={signUpBySocial.result}
            note="Sign Up with social media:"
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
    </Wrapper>
  );
};

export default SignUp;
