import React, {
  useState,
  useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';

import withNotification from '../../common/HOC/withNotification';
import history from '../../../router/history';
import { checkToken } from '../../../storage';

import { RegWrapper, RegFormWrapper } from './styled';
import { mutationResultProps } from '../../propTypes';

const Reg = (props) => {
  const {
    isCompleted,
    signUpAsyncValidationUsername,
    signUpAsyncValidationUsernameResult,
    signUpAsyncValidationEmail,
    signUpAsyncValidationEmailResult,
    signUp,
    signUpResult,
    signUpCompletion,
    signUpCompletionResult,
    signUpBySocial,
    signUpBySocialResult,
  } = props;
  const { search } = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const { token } = queryString.parse(search);

    if (token) {
      try {
        const { regStatus } = checkToken(token, true);

        if (regStatus) {
          setActiveStep(1);
        } else {
          history.push('/reg');
        }
      } catch (e) {
        throw e;
      }
    }
  }, [search]);

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
  isCompleted: PropTypes.bool.isRequired,
  signUpAsyncValidationUsername: PropTypes.func.isRequired,
  signUpAsyncValidationUsernameResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpAsyncValidationEmail: PropTypes.func.isRequired,
  signUpAsyncValidationEmailResult: PropTypes.shape(mutationResultProps).isRequired,
  signUp: PropTypes.func.isRequired,
  signUpResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpCompletion: PropTypes.func.isRequired,
  signUpCompletionResult: PropTypes.shape(mutationResultProps).isRequired,
  signUpBySocial: PropTypes.func.isRequired,
  signUpBySocialResult: PropTypes.shape(mutationResultProps).isRequired,
};

export default withNotification(Reg);
