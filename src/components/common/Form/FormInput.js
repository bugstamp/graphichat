import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const InputWrapper = styled(FormControl)`
  && {
    margin-bottom: 1em;
  }
`;

const FormInput = ({
  value,
  name,
  label,
  type,
  placeholder,
  required,
  autoComplete,
  error,
  isError,
  onChange,
  onBlur,
  ...rest,
}) => {
  return (
    <InputWrapper key={name} fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        error={isError}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      <If condition={isError}>
        <FormHelperText error={isError}>{error}</FormHelperText>
      </If>
    </InputWrapper>
  );
};

export default FormInput;
