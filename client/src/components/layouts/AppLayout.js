import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import { hot } from 'react-hot-loader/root';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../navigation';
import SettingsDialog from '../settings';
import Notification from '../notification';

import useNotification from '../hooks/useNotification';

import storage from '../../storage';
import gql from '../../gql';

import { AppWrapper, AppContainer } from './styled';

const {
  CHECK_SESSION_EXPIRATION,
  RECONNECTION,
  SIGN_OUT,
} = gql;

const AppLayout = (props) => {
  const { children } = props;
  const toggleNotification = useNotification();
  const [settingsDialog, toggleSettingsDialog] = useState(false);

  const apollo = useApolloClient();
  const { data: { sessionExpired } = {} } = useQuery(CHECK_SESSION_EXPIRATION);
  const { data: { reconnection } = {} } = useQuery(RECONNECTION);
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted() {
      apollo.resetStore();
      storage.removeTokens();
      history.push('/login');

      if (sessionExpired) {
        toggleNotification('Session timeout was expired');
      }
    },
  });
  const ref = useRef();
  const prevReconnection = ref.current;

  useEffect(() => {
    if (sessionExpired) {
      signOut();
    }
  }, [sessionExpired, signOut]);
  useEffect(() => {
    ref.current = reconnection;
  }, [reconnection]);
  useEffect(() => {
    if (reconnection) {
      toggleNotification('Reconnecting...');
    } else if (prevReconnection) {
      toggleNotification('Reconnected', 'success');
    }
  }, [reconnection, prevReconnection, toggleNotification]);

  const handleToggleSettingsDialog = useCallback(() => {
    toggleSettingsDialog(!settingsDialog);
  }, [settingsDialog]);

  return (
    <AppWrapper container spacing={0} justify="center">
      <AppContainer elevation={5}>
        <Grid container spacing={0}>
          <Hidden smDown>
            <Grid item>
              <Navigation
                toggleSettingsDialog={handleToggleSettingsDialog}
                signOut={signOut}
              />
            </Grid>
          </Hidden>
          <Grid item xs>
            {children}
          </Grid>
        </Grid>
      </AppContainer>
      <Hidden mdUp implementation="css">
        <Navigation
          variant="horizontal"
          toggleSettingsDialog={handleToggleSettingsDialog}
          signOut={signOut}
        />
      </Hidden>
      <SettingsDialog
        open={settingsDialog}
        toggle={handleToggleSettingsDialog}
      />
      <Notification />
    </AppWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(AppLayout);
export { AppLayout };
