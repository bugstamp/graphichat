import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import SettingsAvatar from './SettingsAvatar';
import SettingsForm from './SettingsForm';

import {
  SettingsWrapper,
} from './styled';

import gql from '../../../gql';
import { userUpdate, uploadAvatarUpdate } from '../../../gql/updates/user';
import useAvatar from '../../hooks/useAvatar';

const {
  GET_ME,
  UPLOAD_AVATAR,
  UPDATE_USER,
} = gql;

const Settings = (props) => {
  const { mode, setMode, setLoading } = props;

  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const [uploadAvatar, { loading: uploading }] = useMutation(UPLOAD_AVATAR, {
    update: uploadAvatarUpdate,
  });
  const [updateUser, updateUserResult] = useMutation(UPDATE_USER, {
    update: userUpdate,
  });
  const { loading: updating, called, error } = updateUserResult;
  const loading = uploading || updating;
  const avatar = useAvatar(me, 'md');

  useEffect(() => {
    if (called && !updating && !error) {
      setMode('read');
    }
  }, [called, updating, error, setMode]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return (
    <SettingsWrapper>
      <SettingsAvatar
        avatar={avatar}
        uploadAvatar={uploadAvatar}
      />
      <SettingsForm
        mode={mode}
        user={me}
        updateUser={updateUser}
        updateUserResult={updateUserResult}
      />
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  mode: PropTypes.oneOf(['read', 'edit']).isRequired,
  setMode: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default memo(Settings);
