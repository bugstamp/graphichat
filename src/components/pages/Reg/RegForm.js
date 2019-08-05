import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Form from '../../common/Form/Form';
import formConfig from '../../common/Form/formConfig';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import RegFormStepper from './RegFormStepper';

import TopProgressLine from '../../common/TopProgressLine';

import { getSpacing, getStyledProps } from '../../../styles';
import { mutationProps } from '../../propTypes';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    max-height: 100%;
    max-width: 375px;
    min-width: 320px;
    position: relative;
    padding: ${getSpacing(4)} ${getSpacing(3)};
    overflow: hidden auto;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const xsDown = breakpoints.down('xs');

    return `
      ${xsDown} {
        max-width: 100%;
        height: 100%;
        border-radius: 0;
        padding: ${getSpacing(1)};
      }
    `;
  }}
  }
`;

const Header = styled(Typography)`
  && {
    width: 100%;
    position: relative;
  }
`;

const Info = styled(Typography)`
  && {
    text-align: center;
  }
`;

const Footer = styled(Typography)`
  && {
    width: 100%;
    margin-top: ${getSpacing(2)};
  }
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
      <TopProgressLine loading={signUp.result.loading || signUpCompletion.result.loading} />
      <Header variant="h1" color="primary" align="center" gutterBottom>
        <RegFormStepper activeStep={activeStep} steps={steps} />
      </Header>
      <Choose>
        <When condition={completed}>
          <Info>
            {'Your account had been successfuly completed.Check your email and confirm registration.'}
          </Info>
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
      <Footer align="center">
        <Link to="/login">I already have a account</Link>
      </Footer>
    </Wrapper>
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
