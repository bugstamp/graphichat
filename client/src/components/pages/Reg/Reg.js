import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import RegContainer from '../../containers/RegContainer';
import RegForm from './RegForm';
import RegPresentation from './RegPresentation';

import withNotification from '../../common/HOC/withNotification';
import storage, { checkToken } from '../../../storage';

import { RegWrapper, RegFormWrapper } from './styled';

const Reg = (props) => {
  const {
    location: { search },
    history,
    toggleNotification,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setStatus] = useState(false);
  const steps = [
    'Create your account',
    'Tell us about yourself',
  ];

  const historyPush = path => history.push(path);

  function handleSetActiveStep(step) {
    setActiveStep(step);
  }

  function handleSetStatus(status) {
    setStatus(status);
  }

  function handleSuccess({ token, refreshToken }) {
    if (token && refreshToken) {
      storage.setTokens(token, refreshToken);
      historyPush('/');
    } else {
      handleSetStatus(true);
    }
  }

  function handleError(e) {
    if (e.graphQLErrors) {
      const { graphQLErrors } = e;
      const { message } = graphQLErrors[0];

      toggleNotification(message);
    }
  }

  useEffect(() => {
    const { token } = queryString.parse(search);

    if (token) {
      try {
        const { regStatus } = checkToken(token, true);

        if (regStatus) {
          handleSetActiveStep(1);
        } else {
          historyPush('/reg');
        }
      } catch (e) {
        throw e;
      }
    }
  });

  return (
    <RegContainer
      signUpProps={{
        onCompleted: ({ signUp }) => handleSuccess(signUp),
      }}
      signUpCompletionProps={{
        onCompleted: ({ signUpCompletion }) => handleSuccess(signUpCompletion),
      }}
      signUpBySocialProps={{
        onCompleted: ({ signUpBySocial }) => handleSuccess(signUpBySocial),
        onError: handleError,
      }}
    >
      {({
        signUpAsyncValidationUsername,
        signUpAsyncValidationEmail,
        signUp,
        signUpCompletion,
        signUpBySocial,
      }) => (
        <RegWrapper container>
          <RegPresentation />
          <RegFormWrapper>
            <RegForm
              steps={steps}
              activeStep={activeStep}
              completed={completed}
              signUpAsyncValidationUsername={signUpAsyncValidationUsername}
              signUpAsyncValidationEmail={signUpAsyncValidationEmail}
              signUp={signUp}
              signUpCompletion={signUpCompletion}
              signUpBySocial={signUpBySocial}
            />
          </RegFormWrapper>
        </RegWrapper>
      )}
    </RegContainer>
  );
};

Reg.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(Reg);
