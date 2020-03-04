import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';
import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';

import history from '../../../router/history';

import { LoginWrapper } from './styled';
import { mutationResultProps } from '../../propTypes';

const Login = (props) => {
  const {
    signIn,
    signInResult,
    signInBySocial,
    signInBySocialResult,
  } = props;
  const [form, toggleForm] = useState(false);

  function handleToggleForm() {
    toggleForm(!form);
  }

  function redirectToSignUp() {
    history.push('/reg');
  }

  const drawerProps = {
    open: form,
    onClose: handleToggleForm,
    anchor: 'right',
  };

  const LoginFormRenderer = (
    <LoginForm
      signIn={signIn}
      signInResult={signInResult}
      signInBySocial={signInBySocial}
      signInBySocialResult={signInBySocialResult}
      redirectToSignUp={redirectToSignUp}
    />
  );

  return (
    <LoginWrapper container>
      <LoginPresentation stopAnimation={form} toggleForm={handleToggleForm} />
      <Hidden xsDown>
        <Drawer {...drawerProps}>
          {LoginFormRenderer}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <FullSwipeableDrawerStyled {...drawerProps}>
          {LoginFormRenderer}
        </FullSwipeableDrawerStyled>
      </Hidden>
    </LoginWrapper>
  );
};

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  signInResult: PropTypes.shape(mutationResultProps).isRequired,
  signInBySocial: PropTypes.func.isRequired,
  signInBySocialResult: PropTypes.shape(mutationResultProps).isRequired,
};

export default Login;
