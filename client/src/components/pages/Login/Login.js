import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';
import FullSwipeableDrawerStyled from '../../common/FullWidthSwipeableDrawer';

import { LoginWrapper } from './styled';

import useNotification from '../../hooks/useNotification';
import storage from '../../../storage';

const Login = (props) => {
  const { history } = props;
  const toggleNotification = useNotification();
  const [form, toggleForm] = React.useState(false);
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const DrawerComponent = smUp
    ? Drawer
    : FullSwipeableDrawerStyled;

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
};

export { Login };

export default Login;
