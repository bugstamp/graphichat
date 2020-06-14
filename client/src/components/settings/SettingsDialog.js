import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import ResponsiveDialog from '../common/ResponsiveDialog/ResponsiveDialog';
import Settings from './Settings/Settings';

import gql from '../../gql';
import { userUpdate, uploadAvatarUpdate } from '../../gql/updates/user';

const {
  GET_ME,
  UPLOAD_AVATAR,
  UPDATE_USER,
} = gql;

const SettingsDialog = (props) => {
  const { open, toggle } = props;

  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const [uploadAvatar, { loading: uploading }] = useMutation(UPLOAD_AVATAR, {
    update: uploadAvatarUpdate,
  });
  const [updateUser, {
    loading: updating,
    data: updateUserResult,
    error,
  }] = useMutation(UPDATE_USER, {
    update: userUpdate,
  });
  const loading = uploading || updating;

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
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default memo(SettingsDialog);
