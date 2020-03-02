import React from 'react';
import PropTypes from 'prop-types';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

import Form from '../../common/Form/Form';
import formConfig from '../../common/Form/formConfig';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import TopProgressLine from '../../common/TopProgressLine';

import { LoginFormWrapper, Header, SignUpButton } from './styled';
import { mutationProps } from '../../propTypes';

const LoginForm = ({
  signIn,
  signInBySocial,
  redirectToSignUp,
}) => (
  <LoginFormWrapper>
    <TopProgressLine loading={signIn.result.loading} />
    <Header variant="h1" color="primary" align="center" gutterBottom>
      <AccountCircleIcon fontSize="inherit" color="primary" />
    </Header>
    <Form
      {...formConfig('signIn')}
      mutation={signIn.mutation}
      result={signIn.result}
      submitButtonText="Sign In"
    />
    <SignUpButton
      onClick={redirectToSignUp}
      color="primary"
      size="large"
      variant="outlined"
      fullWidth
    >
      Sign Up
    </SignUpButton>
    <SocialMedia
      mutation={signInBySocial.mutation}
      result={signInBySocial.result}
    />
  </LoginFormWrapper>
);

LoginForm.propTypes = {
  signIn: PropTypes.shape(mutationProps).isRequired,
  signInBySocial: PropTypes.shape(mutationProps).isRequired,
  redirectToSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
