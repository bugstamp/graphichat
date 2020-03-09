import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';

import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  const [form, toggleForm] = React.useState(false);
  const { data: { sessionExpired } } = useQuery(CHECK_SESSION_EXPIRATION);
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const DrawerComponent = smUp
    ? Drawer
    : FullSwipeableDrawerStyled;

  React.useEffect(() => {
    if (sessionExpired) {
      toggleNotification('Session time was expired');
    }
  }, [sessionExpired, toggleNotification]);

  const handleToggleForm = React.useCallback(() => {
    toggleForm(!form);
  }, [form]);

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

  return (
    <LoginWrapper container>
      <LoginPresentation stopAnimation={form} toggleForm={handleToggleForm} />
      <DrawerComponent
        open={form}
        onClose={handleToggleForm}
        anchor="right"
      >
        <LoginForm
          signIn={signIn}
          signInResult={signInResult}
          signInBySocial={signInBySocial}
          signInBySocialResult={signInBySocialResult}
          redirectToSignUp={redirectToSignUp}
        />
      </DrawerComponent>
    </LoginWrapper>
  );
};

Login.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
};

export { Login };

export default withNotification(Login);
