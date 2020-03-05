import React from 'react';
import PropTypes from 'prop-types';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';

import { RegWrapper, RegFormWrapper } from './styled';
import { mutationResultProps } from '../../propTypes';

const Reg = (props) => {
  const {
    activeStep,
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
  activeStep: PropTypes.number.isRequired,
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

export default Reg;
