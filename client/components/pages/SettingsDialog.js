import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MaterialDialogContent from '@material-ui/core/DialogContent';
import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';

import ResponsiveDialog from '../common/ResponsiveDialog';
import TopProgressLine from '../common/TopProgressLine';

const DialogContent = styled(MaterialDialogContent)`
  && {
    width: 100%;
    max-width: 500px;
  }
`;

const AvatarWrapper = styled.div`
  width: 35%;
  margin: 0 auto;
  position: relative;
`;

const Avatar = styled(MaterialAvatar)`
  && {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

class SettingsDialog extends PureComponent {
  avatarInput = createRef();

  onChangeAvatar = async ({
    target: {
      files: [file],
      validity: { valid },
    },
  }) => {
    const { uploadAvatar } = this.props;

    if (valid) {
      uploadAvatar({ variables: { file } });
    }
  }

  onAvatarClick = () => {
    if (this.avatarInput) {
      this.avatarInput.current.click();
    }
  }

  render() {
    const {
      open,
      toggle,
      avatar,
      avatarUploading,
    } = this.props;

    return (
      <ResponsiveDialog open={open} toggle={toggle}>
        <TopProgressLine loading={avatarUploading} />
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogContent dividers>
          <AvatarWrapper>
            <input
              ref={this.avatarInput}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={this.onChangeAvatar}
              style={{ display: 'none' }}
            />
            <Avatar
              src={avatar.src}
              alt={avatar.text}
              onClick={this.onAvatarClick}
            >
              <CameraIcon fontSize="large" />
            </Avatar>
          </AvatarWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="primary">Close</Button>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  avatarUploading: PropTypes.bool.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default SettingsDialog;
