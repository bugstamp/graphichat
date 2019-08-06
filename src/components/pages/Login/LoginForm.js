import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';
// import {} from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import Button from '@material-ui/core/Button';

import Form from '../../common/Form/Form';
import formConfig from '../../common/Form/formConfig';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import TopProgressLine from '../../common/TopProgressLine';

import { getSpacing, getStyledProps } from '../../../styles';
import { mutationProps } from '../../propTypes';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    max-width: 375px;
    min-width: 320px;
    position: relative;
    padding: ${getSpacing(5)} ${getSpacing(3)};
    overflow: hidden auto;

    ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const xsDown = breakpoints.down('xs');

    return `
      ${xsDown} {
        padding: ${spacing(2)}px;
      }
    `;
  }}
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
}) => (
  <Wrapper elevation={8} square>
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
    />
  </Wrapper>
);

LoginForm.propTypes = {
  signIn: PropTypes.shape(mutationProps).isRequired,
  signInBySocial: PropTypes.shape(mutationProps).isRequired,
  toSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
