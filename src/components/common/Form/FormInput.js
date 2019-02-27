import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
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
  name,
  type,
  label,
  placeholder,
  required,
  autoComplete,
  error,
  isError,
  validate,
  validateField,
  onChange,
  onBlur,
  ...rest,
}) => {
  return (
    <Field name={name} validate={value => validate(value, name)}>
      {({ field }) => (
        <InputWrapper key={name} fullWidth>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            error={isError}
            onChange={onChange}
            onBlur={(event) => {
              validateField(name);

              if (onBlur) {
                onBlur(event);
              }
            }}
            inputProps={{
              onKeyDown: ({ key, target }) => {
                if (key === 'Escape') {
                  target.blur();
                }
              },
            }}
            {...rest}
          />
          <InputError error={isError}>{error}</InputError>
        </InputWrapper>
      )}
    </Field>
  );
};

export default FormInput;
