import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';

import Login from '../pages/Login/Login';
import withNotification from '../common/HOC/withNotification';

import storage from '../../storage';
import history from '../../router/history';
import gql from '../../gql';

const {
  CHECK_SESSION_EXPIRATION,
  SIGN_IN,
  SIGN_IN_BY_SOCIAL,
} = gql;

const LoginContainer = (props) => {
  const { toggleNotification } = props;
  const { data: { sessionExpired = false } } = useQuery(CHECK_SESSION_EXPIRATION);

  useEffect(() => {
    if (sessionExpired) {
      toggleNotification('Session time was expired');
    }
  }, [sessionExpired, toggleNotification]);

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
    <Login
      {...props}
      signIn={signIn}
      signInResult={signInResult}
      signInBySocial={signInBySocial}
      signInBySocialResult={signInBySocialResult}
      toggleNotification={toggleNotification}
    />
  );
};

LoginContainer.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(LoginContainer);
