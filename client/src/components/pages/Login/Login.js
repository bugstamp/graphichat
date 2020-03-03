import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import LoginContainer from '../../containers/LoginContainer';
import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';
import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';
import withNotification from '../../common/HOC/withNotification';

import { LoginWrapper } from './styled';

import storage from '../../../storage';
import gql from '../../../gql';

const { CHECK_SESSION_EXPIRATION } = gql;

const Login = (props) => {
  const { history, toggleNotification } = props;
  const [form, toggleForm] = useState(false);
  const { data: { sessionExpired = false } } = useQuery(CHECK_SESSION_EXPIRATION);

  useEffect(() => {
    if (sessionExpired) {
      toggleNotification('Session time was expired');
    }
  }, [sessionExpired, toggleNotification]);

  function handleToggleForm() {
    toggleForm(!form);
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

  function redirectToSignUp() {
    history.push('/reg');
  }

  return (
    <LoginContainer
      signInProps={{
        onCompleted: ({ signIn }) => handleSuccess(signIn),
        onError: handleError,
      }}
      signInBySocialProps={{
        onCompleted: ({ signInBySocial }) => handleSuccess(signInBySocial),
        onError: handleError,
      }}
    >
      {({
        signIn,
        signInBySocial,
      }) => (
        <LoginWrapper container>
          <LoginPresentation stopAnimation={form} toggleForm={handleToggleForm} />
          <Hidden xsDown>
            <Drawer open={form} onClose={handleToggleForm} anchor="right">
              <LoginForm
                signIn={signIn}
                signInBySocial={signInBySocial}
                redirectToSignUp={redirectToSignUp}
              />
            </Drawer>
          </Hidden>
          <Hidden smUp>
            <FullSwipeableDrawerStyled open={form} onClose={handleToggleForm}>
              <LoginForm
                signIn={signIn}
                signInBySocial={signInBySocial}
                redirectToSignUp={redirectToSignUp}
              />
            </FullSwipeableDrawerStyled>
          </Hidden>
        </LoginWrapper>
      )}
    </LoginContainer>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(Login);
