import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { userAvatarProps } from '../../propTypes';

import {
  AvatarWrapper,
  Avatar,
  Camera,
} from './styled';

const SettingsAvatar = (props) => {
  const {
    avatar,
    uploadAvatar,
  } = props;
  const { src, text } = avatar;
  const inputRef = useRef(null);

  const onClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const onChange = useCallback((e) => {
    const {
      target: {
        files: [file],
        validity: { valid },
      },
    } = e;

    if (valid) {
      uploadAvatar({ variables: { file } });
    }
  }, [uploadAvatar])

  return (
    <AvatarWrapper>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <Avatar
        src={src}
        alt={text}
        onClick={onClick}
      >
        <Camera fontSize="large" />
      </Avatar>
    </AvatarWrapper>
  );
};

SettingsAvatar.propTypes = {
  avatar: PropTypes.shape(userAvatarProps).isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default SettingsAvatar;
