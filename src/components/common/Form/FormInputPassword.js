import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';

import FormInput from './FormInput';

class FormInputPassword extends PureComponent {
  state = {
    showPassword: false,
  }

  toggleShowPassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  render() {
    const { showPassword } = this.state;
    const { type, ...rest } = this.props;
    const validType = showPassword ? 'text' : type;

    return (
      <FormInput
        {...rest}
        type={validType}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton onClick={this.toggleShowPassword}>
              <Choose>
                <When condition={showPassword}>
                  <VisibilityIcon />
                </When>
                <Otherwise>
                  <VisibilityOffIcon />
                </Otherwise>
              </Choose>
            </IconButton>
          </InputAdornment>
        )}
      />
    );
  }
}

export default FormInputPassword;
