import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { FormInputWrapper, FormInputError } from './styled';

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
  function handleValidate(value) {
    validate(value, name);
  }

  function handleOnBlur(e) {
    validateField(name);

    if (onBlur) onBlur(e);
  }

  function onKeyDown({ key, target }) {
    if (key === 'Escape') {
      target.blur();
    }
  }

  return (
    <Field name={name} validate={handleValidate}>
      {({ field }) => (
        <FormInputWrapper fullWidth>
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
            onBlur={handleOnBlur}
            inputProps={{ onKeyDown }}
            {...rest}
          />
          <FormInputError error={isError}>{error}</FormInputError>
        </FormInputWrapper>
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
