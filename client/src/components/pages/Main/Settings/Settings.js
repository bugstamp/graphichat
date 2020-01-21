import React, {
  PureComponent,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import { map, omit, isEqual } from 'lodash';

import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/CheckRounded';

import {
  SettingsWrapper,
  AvatarWrapper,
  Avatar,
  Camera,
  FormWrapper,
  InputCheckIconWrapper,
} from './styled';

import { getAvatar } from '../../../../helpers';
import { meProps } from '../../../propTypes';

class Settings extends PureComponent {
  avatarInput = createRef()

  state = {
    errors: {},
    values: {},
    called: {},
    success: '',
  }

  fields = [
    {
      id: 'username',
      label: 'User Name',
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
    const { error, updateUserResult } = this.props;
    const snapshot = {
      error: null,
      success: null,
    };

    if (!prevProps.error && error) {
      const { graphQLErrors } = error;
      const { data = null } = graphQLErrors[0];

      if (data) {
        const { message } = graphQLErrors[0];
        const { invalidField = null } = data;

        if (invalidField) {
          snapshot.error = { [invalidField]: message };
        }
      }
    }
    if (!isEqual(prevProps.updateUserResult, updateUserResult)) {
      snapshot.success = updateUserResult.field || null;
    }
    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, { error, success }) {
    if (error) {
      this.addError(error);
    }
    if (success) {
      this.setSuccess(success);
    }
  }

  setSuccess = success => this.setState({ success });

  onChange = ({ target }) => {
    const { name, value } = target;

    this.setState(({ called, values }) => {
      const updatedCalled = !called[name]
        ? { ...called, [name]: true }
        : called;
      const updatedValues = { ...values, [name]: value };

      return {
        called: updatedCalled,
        values: updatedValues,
      };
    });
  }

  onChangeAvatar = (e) => {
    const {
      target: {
        files: [file],
        validity: { valid },
      },
    } = e;
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
    const existedValue = me[field];

    if (value !== existedValue && value) {
      updateUser({ variables: { field, value } });

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
    const {
      called,
      values,
      errors,
      success,
    } = this.state;
    const { me } = this.props;
    const avatar = getAvatar(me, 'md');

    return (
      <SettingsWrapper>
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
        <FormWrapper>
          {
            map(this.fields, ({ id, label }) => {
              const value = called[id] ? values[id] : me[id];
              const error = !!errors[id];
              const message = errors[id];
              const isUpdated = success === id;

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
                  InputProps={{
                    endAdornment: isUpdated && (
                      <InputCheckIconWrapper position="end">
                        <CheckIcon color="action" />
                      </InputCheckIconWrapper>
                    ),
                  }}
                  fullWidth
                  required
                />
              );
            })
          }
        </FormWrapper>
      </SettingsWrapper>
    );
  }
}

Settings.defaultProps = {
  me: {},
  updateUserResult: {},
  error: null,
};
Settings.propTypes = {
  me: PropTypes.shape(meProps),
  uploadAvatar: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserResult: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
};

export default Settings;
