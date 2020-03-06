import React from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';

const FormInputPasswordAdornment = ({ showPassword, onClick }) => (
  <InputAdornment position="end">
    <IconButton onClick={onClick}>
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
);

FormInputPasswordAdornment.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FormInputPasswordAdornment;
