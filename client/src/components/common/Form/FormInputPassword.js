import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';

import FormInput from './FormInput';

const FormInputPassword = (props) => {
  const { type, ...rest } = props;
  const [showPassword, togglePassword] = useState(false);
  const validInputType = showPassword ? 'text' : type;

  function handlePasswordToggling() {
    togglePassword(!showPassword);
  }

  return (
    <FormInput
      {...rest}
      type={validInputType}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton onClick={handlePasswordToggling}>
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
};

FormInputPassword.propTypes = {
  type: PropTypes.string.isRequired,
};

export default memo(FormInputPassword);
