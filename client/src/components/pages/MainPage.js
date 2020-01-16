import React, {
  cloneElement,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Navigation from '../common/Navigation/Navigation';
import SettingsDialog from './SettingsDialog';
import { AppContainer, MainPageWrapper } from './styled';

import { getAvatar } from '../../helpers';
import { meProps } from '../propTypes';

const MainPage = (props) => {
  const {
    children,
    loading,
    me,
    avatarUploading,
    uploadAvatar,
    updating,
    updateUser,
    userUpdatingError,
    signOut,
    sessionExpired,
  } = props;
  const [settingsDialog, toggleSettingsDialog] = useState(false);
  const handleToggleSettingDialog = () => {
    toggleSettingsDialog(!settingsDialog);
  };
  const handleSignOut = () => {
    const { id } = me;

    signOut({ variables: { userId: id } });
  };
  useEffect(() => {
    if (sessionExpired) {
      handleSignOut();
    }
  }, [sessionExpired]);
  const avatar = getAvatar(me, 'md');
  const childrenCloneProps = {
    initialLoading: loading,
    toggleSettingsDialog: handleToggleSettingDialog,
    signOut: handleSignOut,
  };
  const childrenClone = children
    ? cloneElement(children, childrenCloneProps)
    : null;

  return (
    <AppContainer container spacing={0} justify="center">
      <MainPageWrapper>
        <Grid container spacing={0}>
          <Hidden smDown>
            <Grid item>
              <Navigation
                toggleSettingsDialog={handleToggleSettingDialog}
                signOut={handleSignOut}
              />
            </Grid>
          </Hidden>
          <Grid item xs>
            {childrenClone}
          </Grid>
        </Grid>
      </MainPageWrapper>
      <SettingsDialog
        me={me}
        open={settingsDialog}
        toggle={handleToggleSettingDialog}
        avatar={avatar}
        avatarUploading={avatarUploading}
        uploadAvatar={uploadAvatar}
        updating={updating}
        updateUser={updateUser}
        error={userUpdatingError}
      />
    </AppContainer>
  );
};

MainPage.defaultProps = {
  children: null,
  me: {},
  userUpdatingError: null,
};
MainPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  loading: PropTypes.bool.isRequired,
  me: PropTypes.shape(meProps),
  sessionExpired: PropTypes.bool.isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  userUpdatingError: PropTypes.instanceOf(Error),
};

export default MainPage;
