import React from 'react';
import PropTypes from 'prop-types';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

import Form from '../../common/Form/Form';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import TopProgressLine from '../../common/TopProgressLine';

import { LoginFormWrapper, Header, SignUpButton } from './styled';
import { mutationResultProps } from '../../propTypes';

const LoginForm = ({
  signIn,
  signInResult,
  signInBySocial,
  signInBySocialResult,
  redirectToSignUp,
}) => {
  const { loading } = signInResult;

  return (
    <LoginFormWrapper>
      <TopProgressLine loading={loading} />
      <Header variant="h1" color="primary" align="center" gutterBottom>
        <AccountCircleIcon fontSize="inherit" color="primary" />
      </Header>
      <Form
        formId="signIn"
        mutation={signIn}
        result={signInResult}
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
        mutation={signInBySocial}
        result={signInBySocialResult}
      />
    </LoginFormWrapper>
  );
};

LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  signInResult: PropTypes.shape(mutationResultProps).isRequired,
  signInBySocial: PropTypes.func.isRequired,
  signInBySocialResult: PropTypes.shape(mutationResultProps).isRequired,
  redirectToSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
