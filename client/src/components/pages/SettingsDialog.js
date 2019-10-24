import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'lodash';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MaterialDialogContent from '@material-ui/core/DialogContent';
import MaterialAvatar from '@material-ui/core/Avatar';
import CameraIcon from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ResponsiveDialog from '../common/ResponsiveDialog';
import TopProgressLine from '../common/TopProgressLine';

import { getSpacing } from '../../styles';

const DialogContent = styled(MaterialDialogContent)`
  && {
    width: 100%;
  }
`;

const AvatarWrapper = styled.div`
  width: 50%;
  max-width: 200px;
  height: auto;
  margin: 0 auto;
  padding-bottom: ${getSpacing(2)};
  position: relative;
`;

const Avatar = styled(MaterialAvatar)`
  && {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  padding: ${getSpacing(1)};
`;

class SettingsDialog extends PureComponent {
  avatarInput = createRef()

  fields = [
    {
      id: 'username',
      label: 'Username',
    },
    {
      id: 'firstName',
      label: 'First Name',
    },
    {
      id: 'lastName',
      label: 'Last Name',
    },
  ]

  onChangeAvatar = ({
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

  onChangeField = (e) => {
    const { updateUser, me } = this.props;
    const { target: { name, value } } = e;
    const form = { field: name, value };

    if (value) {
      updateUser({ variables: { form } });
    } else {
      e.target.value = me[name];
    }
  }

  onKeyPressed = (e) => {
    const { key, target } = e;

    if (key === 'Enter') {
      target.blur();
    }
  }

  render() {
    const {
      open,
      toggle,
      avatar,
      avatarUploading,
      updating,
      me,
    } = this.props;

    return (
      <ResponsiveDialog
        open={open}
        toggle={toggle}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
      >
        <TopProgressLine loading={avatarUploading || updating} />
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
              <If condition={!avatar.src}>
                <CameraIcon fontSize="large" />
              </If>
            </Avatar>
          </AvatarWrapper>
          <ProfileWrapper>
            {
              map(this.fields, ({ id, label }) => (
                <TextField
                  key={id}
                  name={id}
                  value={me[id]}
                  label={label}
                  variant="outlined"
                  margin="dense"
                  onBlur={this.onChangeField}
                  onKeyDown={this.onKeyPressed}
                  fullWidth
                  required
                />
              ))
            }
          </ProfileWrapper>
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
