import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';

import Form from '../../common/Form/Form';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import TopProgressLine from '../../common/TopProgressLine';

import { LoginFormWrapper, Header, SignUpButton } from './styled';

import gql from '../../../gql';

const {
  SIGN_IN,
  SIGN_IN_BY_SOCIAL,
} = gql;

const LoginForm = ({
  onSuccess,
  onError,
  redirectToSignUp,
}) => {
  const [signIn, signInResult] = useMutation(SIGN_IN, {
    onCompleted: onSuccess('signIn'),
    onError,
  });
  const [signInBySocial, signInBySocialResult] = useMutation(SIGN_IN_BY_SOCIAL, {
    onCompleted: onSuccess('signInBySocial'),
    onError,
  });
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
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  redirectToSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
