import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../../common/Navigation/Navigation';
import SettingsDialog from './SettingsDialog';
import { AppGrid, AppContainer } from './styled';

const Main = (props) => {
  const {
    children,
    loading,
    userId,
    signOut,
    sessionExpired,
  } = props;
  const [settingsDialog, toggleSettingsDialog] = useState(false);

  const handleToggleSettingsDialog = useCallback(() => {
    toggleSettingsDialog(!settingsDialog);
  }, [settingsDialog]);

  const handleSignOut = useCallback(() => {
    signOut({ variables: { userId } });
  }, [userId, signOut]);

  useEffect(() => {
    if (sessionExpired) {
      handleSignOut();
    }
  }, [sessionExpired, handleSignOut]);

  return (
    <AppGrid container spacing={0} justify="center">
      <AppContainer elevation={5}>
        <Grid container spacing={0}>
          <Hidden smDown>
            <Grid item>
              <Navigation
                toggleSettingsDialog={handleToggleSettingsDialog}
                signOut={handleSignOut}
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
          toggleSettingsDialog={toggleSettingsDialog}
          signOut={signOut}
        />
      </Hidden>
      <SettingsDialog
        open={settingsDialog}
        toggle={handleToggleSettingsDialog}
      />
    </AppGrid>
  );
};

Main.defaultProps = {
  children: null,
  userId: null,
};
Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  sessionExpired: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Main;
