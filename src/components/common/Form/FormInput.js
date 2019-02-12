import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const InputWrapper = styled(FormControl)`
  && {
    position: relative;
    margin-bottom: 1.5em;
  }
`;

const InputError = styled(FormHelperText)`
  && {
    ${position('absolute', null, 0, '-1em', 0)}
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
        inputProps={{
          onKeyDown: (event) => {
            const { key, target } = event;

            if (key === 'Escape') {
              target.blur();
            }
          },
        }}
        {...rest}
      />
      <InputError error={isError}>{error}</InputError>
    </InputWrapper>
  );
};

export default FormInput;
