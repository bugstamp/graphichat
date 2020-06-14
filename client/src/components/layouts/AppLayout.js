import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { hot } from 'react-hot-loader';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';
import SettingsDialog from '../pages/Main/SettingsDialog';

import storage from '../../storage';
import gql from '../../gql';
import { userUpdate, userActivityUpdate } from '../../gql/updates/user';
import { chatCreatedUpdate } from '../../gql/updates/chat';

import { AppWrapper, AppContainer } from './styled';

const {
  CHECK_SESSION_EXPIRATION,
  GET_INITIAL_DATA,
  USER_UPDATE_SUBSCRIPTION,
  USER_ACTIVITY_SUBSCRIPTION,
  CHAT_CREATED_SUBSCRIPTION,
  SIGN_OUT,
} = gql;

const AppLayout = (props) => {
  const { children } = props;
  const [settingsDialog, toggleSettingsDialog] = useState(false);
  const { loading, data = { me: {} } } = useQuery(GET_INITIAL_DATA);
  const { data: sessionData = { sessionExpired: false } } = useQuery(CHECK_SESSION_EXPIRATION);
  useSubscription(USER_UPDATE_SUBSCRIPTION, {
    onSubscriptionData: userUpdate,
  });
  useSubscription(USER_ACTIVITY_SUBSCRIPTION, {
    onSubscriptionData: userActivityUpdate,
  });
  useSubscription(CHAT_CREATED_SUBSCRIPTION, {
    onSubscriptionData: chatCreatedUpdate,
  });
  const [signOut] = useMutation(SIGN_OUT, {
    update(__root, variables, { client }) {
      storage.removeTokens();
      client.resetStore();
      history.push('/');
    },
  });

  const { me: { id } } = data;
  const { sessionExpired } = sessionData;

  const handleToggleSettingsDialog = useCallback(() => {
    toggleSettingsDialog(!settingsDialog);
  }, [settingsDialog]);

  const handleSignOut = useCallback(() => {
    signOut({ variables: { userId: id } });
  }, [id, signOut]);

  useEffect(() => {
    if (sessionExpired) {
      handleSignOut();
    }
  }, [sessionExpired, handleSignOut]);

  return (
    <AppWrapper container spacing={0} justify="center">
      <AppContainer elevation={5}>
        <Grid container spacing={0}>
          <Hidden smDown>
            <Grid item>
              <Navigation signOut={handleSignOut} />
            </Grid>
          </Hidden>
          <Grid item xs>
            {children}
          </Grid>
        </Grid>
      </AppContainer>
      <Hidden mdUp implementation="css">
        <Navigation variant="horizontal" signOut={signOut} />
      </Hidden>
      <SettingsDialog
        open={settingsDialog}
        toggle={handleToggleSettingsDialog}
      />
    </AppWrapper>
  );
};

AppLayout.defaultProps = {
  children: null,
};
AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default hot(module)(AppLayout);
export { AppLayout };
