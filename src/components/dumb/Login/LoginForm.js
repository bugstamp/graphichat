import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';
// import {} from 'polished';
// import {} from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import Button from '@material-ui/core/Button';

import Form from '../../common/Form/Form';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import formConfig from '../../common/Form/formConfig';

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

const SignUpButton = styled(Button)`
  && {
    margin-top: 1em;
  }
`;

const LoginForm = ({
  signIn,
  signInBySocial,
  toSignUp,
}) => {
  return (
    <Wrapper elevation={8}>
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
        onClick={toSignUp}
        color="primary"
        size="large"
        variant="outlined"
        fullWidth
      >
        {'Sign Up'}
      </SignUpButton>
      <SocialMedia
        mutation={signInBySocial.mutation}
        result={signInBySocial.result}
        note="Sign In with social media:"
      />
    </Wrapper>
  );
};

export default withRouter(LoginForm);
