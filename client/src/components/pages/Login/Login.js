import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';

import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';

import { LoginWrapper } from './styled';
import { mutationResultProps } from '../../propTypes';

const Login = (props) => {
  const {
    form,
    toggleForm,
    redirectToSignUp,
    signIn,
    signInResult,
    signInBySocial,
    signInBySocialResult,
  } = props;

  const drawerProps = {
    open: form,
    onClose: toggleForm,
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
      <LoginPresentation stopAnimation={form} toggleForm={toggleForm} />
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
  form: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
  redirectToSignUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signInResult: PropTypes.shape(mutationResultProps).isRequired,
  signInBySocial: PropTypes.func.isRequired,
  signInBySocialResult: PropTypes.shape(mutationResultProps).isRequired,
};

export default Login;
