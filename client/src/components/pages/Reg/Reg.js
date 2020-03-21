import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';
import withNotification from '../../common/HOC/withNotification';

import history from '../../../router/history';
import storage, { checkToken } from '../../../storage';

import { RegWrapper, RegFormWrapper } from './styled';

const Reg = (props) => {
  const { toggleNotification } = props;
  const { search } = useLocation();
  const [isCompleted, setRegStatus] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const { token } = queryString.parse(search);

    if (token) {
      try {
        checkToken(token, true);

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

  return (
    <RegWrapper container>
      <RegPresentation />
      <RegFormWrapper>
        <RegForm
          activeStep={activeStep}
          isCompleted={isCompleted}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </RegFormWrapper>
    </RegWrapper>
  );
};

Reg.propTypes = {
  toggleNotification: PropTypes.func.isRequired,
};

export default withNotification(Reg);
