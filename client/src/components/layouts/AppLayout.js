import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { hot } from 'react-hot-loader';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../navigation';
import SettingsDialog from '../settings';
import useNotification from '../hooks/useNotification';

import apollo from '../../apollo';
import storage from '../../storage';
import gql from '../../gql';

import { AppWrapper, AppContainer } from './styled';

const {
  CHECK_SESSION_EXPIRATION,
  SIGN_OUT,
} = gql;

const AppLayout = (props) => {
  const { children } = props;
  const toggleNotification = useNotification();
  const [settingsDialog, toggleSettingsDialog] = useState(false);

  const { data: { sessionExpired } = {} } = useQuery(CHECK_SESSION_EXPIRATION);
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted() {
      apollo.resetStore();
      storage.removeTokens();
      history.push('/login');
      toggleNotification('Session time was expired');
    },
  });

  const handleToggleSettingsDialog = useCallback(() => {
    toggleSettingsDialog(!settingsDialog);
  }, [settingsDialog]);

  useEffect(() => {
    if (sessionExpired) {
      signOut();
    }
  }, [sessionExpired, signOut]);

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
    </AppWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(AppLayout);
export { AppLayout };
