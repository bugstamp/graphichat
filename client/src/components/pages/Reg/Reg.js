import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';

import { RegWrapper, RegFormWrapper } from './styled';

import useNotification from '../../hooks/useNotification';
import storage from '../../../storage';

const Reg = (props) => {
  const { location: { search }, history } = props;
  const toggleNotification = useNotification();
  const [isCompleted, setRegStatus] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = queryString.parse(search);

  React.useEffect(() => {
    if (id) {
      setActiveStep(1);
    }
  }, [id, history]);

  function handleSuccess(dataKey) {
    return (data) => {
      const { token, refreshToken } = data[dataKey];

      if (token && refreshToken) {
        storage.setTokens(token, refreshToken);
        history.push('/');
      } else {
        setRegStatus(true);
      }
    };
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
          userId={id}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export { Reg };

export default Reg;
