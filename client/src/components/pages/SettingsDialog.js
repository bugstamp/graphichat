import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ResponsiveDialog from '../common/ResponsiveDialog/ResponsiveDialog';
import ProfileSettings from './Main/ProfileSettings';

import SettingsDialogContainer from '../containers/SettingsDialogContainer';

import { getAvatar } from '../../helpers';

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
            loading: updating,
            error,
          },
        },
      }) => {
        const { me } = data;
        const avatar = getAvatar(me);

        return (
          <ResponsiveDialog
            open={open}
            toggle={toggle}
            loading={avatarUploading || updating}
            title="Profile Settings"
          >
            <ProfileSettings
              me={me}
              error={error}
              updateUser={updateUser}
              uploadAvatar={uploadAvatar}
              avatar={avatar}
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
