import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import RegForm from './RegForm';
import RegPresentation from './RegPresentation';
import withNotification from '../../common/HOC/withNotification';

import storage from '../../../storage';

import { RegWrapper, RegFormWrapper } from './styled';

const Reg = (props) => {
  const { location, history, toggleNotification } = props;
  const { search } = location;
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
  toggleNotification: PropTypes.func.isRequired,
};

export { Reg };

export default withNotification(Reg);
