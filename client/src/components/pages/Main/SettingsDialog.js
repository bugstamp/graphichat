import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ResponsiveDialog from '../../common/ResponsiveDialog/ResponsiveDialog';
import Settings from './Settings/Settings';

import SettingsDialogContainer from '../../containers/SettingsDialogContainer';

const SettingsDialog = ({ open, toggle }) => {
  return (
    <SettingsDialogContainer>
      {({
        getMe: {
          data = {},
        },
        uploadAvatar: {
          mutation: uploadAvatar,
          result: {
            loading: avatarUploading,
          },
        },
        updateUser: {
          mutation: updateUser,
          result: {
            data: updateUserData = {},
            loading: updating,
            error,
          },
        },
      }) => {
        const { me } = data;
        const { updateUser: updateUserResult = {} } = updateUserData;
        const loading = avatarUploading || updating;

        return (
          <ResponsiveDialog
            open={open}
            toggle={toggle}
            loading={loading}
            title="Settings"
          >
            <Settings
              me={me}
              error={error}
              updateUser={updateUser}
              updateUserResult={updateUserResult}
              uploadAvatar={uploadAvatar}
            />
          </ResponsiveDialog>
        );
      }}
    </SettingsDialogContainer>
  );
};

SettingsDialog.defaultProps = {
  open: false,
};
SettingsDialog.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default memo(SettingsDialog);
