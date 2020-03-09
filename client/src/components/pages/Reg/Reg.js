import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import queryString from 'query-string';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';
import withNotification from '../../common/HOC/withNotification';

import history from '../../../router/history';
import storage, { checkToken } from '../../../storage';
import gql from '../../../gql';

import { RegWrapper, RegFormWrapper } from './styled';

const {
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
} = gql;

const Reg = (props) => {
  const { toggleNotification } = props;
  const { search } = useLocation();
  const [isCompleted, setRegStatus] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const { token } = queryString.parse(search);

    if (token) {
      try {
        checkToken(token, 'register');

        setActiveStep(1);
      } catch (e) {
        history.push('/reg');
      }
    }
  }, [search]);

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
    <RegWrapper container>
      <RegPresentation />
      <RegFormWrapper>
        <RegForm
          activeStep={activeStep}
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
      </RegFormWrapper>
    </RegWrapper>
  );
};

Reg.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(Reg);
