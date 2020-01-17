import React, {
  cloneElement,
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
  const handleToggleSettingsDialog = () => {
    toggleSettingsDialog(!settingsDialog);
  };
  const handleSignOut = useCallback(() => {
    signOut({ variables: { userId } });
  }, [userId, signOut]);
  useEffect(() => {
    if (sessionExpired) {
      handleSignOut();
    }
  }, [sessionExpired, handleSignOut]);
  const childrenCloneProps = {
    initialLoading: loading,
    toggleSettingsDialog: handleToggleSettingsDialog,
    signOut: handleSignOut,
  };
  const childrenClone = children
    ? cloneElement(children, childrenCloneProps)
    : null;

  return (
    <AppGrid container spacing={0} justify="center">
      <AppContainer>
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
            {childrenClone}
          </Grid>
        </Grid>
      </AppContainer>
      <SettingsDialog open={settingsDialog} toggle={handleToggleSettingsDialog} />
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
