import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';
import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';
import withNotification from '../../common/HOC/withNotification';

import { LoginWrapper } from './styled';

import storage from '../../../storage';
import gql from '../../../gql';

const { CHECK_SESSION_EXPIRATION } = gql;

const Login = (props) => {
  const { history, toggleNotification } = props;
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

  function handleSuccess(dataKey) {
    return (data) => {
      const { token, refreshToken } = data[dataKey];

      storage.setTokens(token, refreshToken);
      history.push('/');
    };
  }

  function handleError(e) {
    if (e.graphQLErrors) {
      const { graphQLErrors } = e;
      const { message, data = null } = graphQLErrors[0];

      if (data) {
        const { invalidField = null, userId = null } = data;

        if (!invalidField) {
          toggleNotification(message);

          if (userId) {
            setTimeout(() => {
              history.push(`/reg?id=${userId}`);
            }, 1000);
          }
        }
      }
    }
  }

  return (
    <LoginWrapper container>
      <LoginPresentation stopAnimation={form} toggleForm={handleToggleForm} />
      <DrawerComponent
        open={form}
        onClose={handleToggleForm}
        anchor="right"
      >
        <LoginForm
          onSuccess={handleSuccess}
          onError={handleError}
          redirectToSignUp={redirectToSignUp}
        />
      </DrawerComponent>
    </LoginWrapper>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export { Login };

export default withNotification(Login);
