import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import FormInputPasswordAdornment from './FormInpuPasswordAdornment';

const FormInputPassword = (props) => {
  const { type, ...rest } = props;
  const [showPassword, togglePassword] = useState(false);
  const validInputType = showPassword ? 'text' : type;

  const handlePasswordToggling = useCallback(() => {
    togglePassword(!showPassword);
  }, [showPassword]);

  const memoizedInputAdornment = useMemo(
    () => (
      <FormInputPasswordAdornment
        showPassword={showPassword}
        onClick={handlePasswordToggling}
      />
    ),
    [showPassword, handlePasswordToggling],
  );

  return (
    <FormInput
      {...rest}
      type={validInputType}
      endAdornment={memoizedInputAdornment}
    />
  );
};

FormInputPassword.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FormInputPassword;
