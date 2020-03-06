import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';
import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';
import withNotification from '../../common/HOC/withNotification';

import storage from '../../../storage';
import history from '../../../router/history';
import gql from '../../../gql';

import { LoginWrapper } from './styled';

const {
  CHECK_SESSION_EXPIRATION,
  SIGN_IN,
  SIGN_IN_BY_SOCIAL,
} = gql;

const Login = (props) => {
  const { toggleNotification } = props;
  const { data: { sessionExpired = false } } = useQuery(CHECK_SESSION_EXPIRATION);
  const [form, toggleForm] = useState(false);
  const handleToggleForm = useCallback(() => {
    toggleForm(!form);
  }, [form]);

  useEffect(() => {
    if (sessionExpired) {
      toggleNotification('Session time was expired');
    }
  }, [sessionExpired, toggleNotification]);

  function redirectToSignUp() {
    history.push('/reg');
  }

  function handleSuccess({ token, refreshToken }) {
    storage.setTokens(token, refreshToken);
    history.push('/');
  }

  function handleError(e) {
    if (e.graphQLErrors) {
      const { graphQLErrors } = e;
      const { message, data = null } = graphQLErrors[0];

      if (data) {
        const { invalidField = null } = data;

        if (!invalidField) {
          toggleNotification(message);
        }
      }
    }
  }

  const [signIn, signInResult] = useMutation(SIGN_IN, {
    onCompleted: data => handleSuccess(data.signIn),
    onError: handleError,
  });
  const [signInBySocial, signInBySocialResult] = useMutation(SIGN_IN_BY_SOCIAL, {
    onCompleted: data => handleSuccess(data.signInBySocial),
    onError: handleError,
  });

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
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(Login);
