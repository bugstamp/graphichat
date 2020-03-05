import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import Reg from '../pages/Reg/Reg';
import withNotification from '../common/HOC/withNotification';

import history from '../../router/history';
import storage from '../../storage';
import gql from '../../gql';

const {
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
} = gql;

const RegContainer = (props) => {
  const { toggleNotification } = props;
  const [isCompleted, setRegStatus] = useState(false);

  function handleSuccess({ token, refreshToken }) {
    if (token && refreshToken) {
      storage.setTokens(token, refreshToken);
      history.push('/');
    } else {
      setRegStatus(true);
    }
  }

  function handleError(e) {
    if (e.graphQLErrors) {
      const { graphQLErrors } = e;
      const { message } = graphQLErrors[0];

      toggleNotification(message);
    }
  }

  const [
    signUpAsyncValidationUsername,
    signUpAsyncValidationUsernameResult,
  ] = useMutation(SIGN_UP_ASYNC_VALIDATION);
  const [
    signUpAsyncValidationEmail,
    signUpAsyncValidationEmailResult,
  ] = useMutation(SIGN_UP_ASYNC_VALIDATION);
  const [signUp, signUpResult] = useMutation(SIGN_UP, {
    onCompleted: data => handleSuccess(data.signUp),
  });
  const [signUpCompletion, signUpCompletionResult] = useMutation(SIGN_UP_COMPLETION, {
    onCompleted: data => handleSuccess(data.signUpCompletion),
  });
  const [signUpBySocial, signUpBySocialResult] = useMutation(SIGN_UP_BY_SOCIAL, {
    onCompleted: data => handleSuccess(data.signUpBySocial),
    onError: handleError,
  });

  return (
    <Reg
      {...props}
      isCompleted={isCompleted}
      signUpAsyncValidationUsername={signUpAsyncValidationUsername}
      signUpAsyncValidationUsernameResult={signUpAsyncValidationUsernameResult}
      signUpAsyncValidationEmail={signUpAsyncValidationEmail}
      signUpAsyncValidationEmailResult={signUpAsyncValidationEmailResult}
      signUp={signUp}
      signUpResult={signUpResult}
      signUpCompletion={signUpCompletion}
      signUpCompletionResult={signUpCompletionResult}
      signUpBySocial={signUpBySocial}
      signUpBySocialResult={signUpBySocialResult}
    />
  );
};

RegContainer.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(RegContainer);
