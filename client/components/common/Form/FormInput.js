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
    padding-bottom: 1.5em;
  }
`;

const InputError = styled(FormHelperText)`
  && {
    ${position('absolute', null, 0, '0.5em', 0)}
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
  ...rest
}) => {
  return (
    <Field name={name} validate={value => validate(value, name)}>
      {({ field }) => (
        <InputWrapper fullWidth>
          <InputLabel shrink={type === 'date' || undefined} htmlFor={name}>{label}</InputLabel>
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

              if (onBlur) onBlur(event);
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

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  error: undefined,
  isError: false,
};
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  autoComplete: PropTypes.string.isRequired,
  error: PropTypes.string,
  isError: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default FormInput;
