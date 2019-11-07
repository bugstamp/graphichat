import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, set, omit } from 'lodash';
import { position } from 'polished';

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
import { meProps } from '../propTypes';

const DialogContent = styled(MaterialDialogContent)`
  && {
    width: 100%;
  }
`;

const AvatarWrapper = styled.div`
  padding-bottom: ${getSpacing(2)};
  position: relative;
`;

const Avatar = styled(MaterialAvatar)`
  && {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    position: relative;
    color: ${({ src }) => (src && '#fff')};
    cursor: pointer;

    ${({ src }) => src && `
      > svg {
        opacity: 0;
      }

      &:hover {
        > svg {
          opacity: .6;
        }
      }
    `}
  }
`;

const Camera = styled(CameraIcon)`
  && {
    ${position('absolute', '50%', null, null, '50%')};
    transform: translate(-50%, -50%);
    transition: all .3s ease;
  }
`;

const ProfileWrapper = styled.div`
  width: 100%;
  padding: ${getSpacing(1)};
`;

class SettingsDialog extends PureComponent {
  avatarInput = createRef()

  state = {
    errors: {},
    values: {},
    called: {},
  }

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

  getSnapshotBeforeUpdate(prevProps) {
    const { error } = this.props;
    const snapshot = {
      error: null,
    };

    if (!prevProps.error && error) {
      const { graphQLErrors } = error;
      const { message, data: { invalidField = null } } = graphQLErrors[0];

      if (invalidField) {
        snapshot.error = { [invalidField]: message };
      }
    }
    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, { error }) {
    if (error) {
      this.addError(error);
    }
  }

  onChange = ({ target }) => {
    const { name, value } = target;

    this.setState(({ called, values }) => {
      if (!called[name]) {
        set(called, name, true);
      }
      return ({
        called,
        values: { ...values, [name]: value },
      });
    });
  }

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

  onSubmit = ({ target }) => {
    const { errors } = this.state;
    const { updateUser, me } = this.props;
    const { name: field, value } = target;
    const form = { field, value };
    const existedValue = me[field];

    if (value !== existedValue && value) {
      updateUser({ variables: { form } });

      if (errors[field]) {
        this.setState(() => ({
          errors: omit(errors, field),
        }));
      }
    } else if (!value) {
      this.onChange({ target: { name: field, value: existedValue } });
    }
  }

  onKeyPressed = (e) => {
    const { key, target } = e;

    if (key === 'Enter') {
      target.blur();
    }
  }

  addError = (error) => {
    this.setState(({ errors }) => ({
      errors: { ...errors, ...error },
    }));
  }

  render() {
    const { called, values, errors } = this.state;
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
              <Camera fontSize="large" />
            </Avatar>
          </AvatarWrapper>
          <ProfileWrapper>
            {
              map(this.fields, ({ id, label }) => {
                const value = called[id] ? values[id] : me[id];
                const error = !!errors[id];
                const message = errors[id];

                return (
                  <TextField
                    key={id}
                    name={id}
                    value={value}
                    label={label}
                    error={error}
                    helperText={message}
                    variant="outlined"
                    margin="dense"
                    onChange={this.onChange}
                    onBlur={this.onSubmit}
                    onKeyDown={this.onKeyPressed}
                    fullWidth
                    required
                  />
                );
              })
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

SettingsDialog.defaultProps = {
  me: {},
  error: null,
};
SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  me: PropTypes.shape(meProps),
  avatarUploading: PropTypes.bool.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};

export default SettingsDialog;
