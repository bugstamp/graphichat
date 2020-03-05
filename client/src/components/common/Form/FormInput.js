import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { trim } from 'lodash';

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
  setFieldValue,
  ...rest
}) => {
  const shrink = type === 'date' || undefined;
  const isPassword = name === 'password';

  function handleValidate(value) {
    if (!isPassword) {
      const trimmedValue = trim(value);

      validate(name, trimmedValue);
    } else {
      validate(name, value);
    }
  }

  function handleOnBlur(e) {
    const { target } = e;
    const { value } = target;
    const trimmedValue = trim(value);

    if (!isPassword) {
      setFieldValue(name, trimmedValue);
    }
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
          <InputLabel shrink={shrink} htmlFor={name}>{label}</InputLabel>
          <Input
            {...field}
            id={name}
            type={type}
            error={isError}
            onChange={onChange}
            onBlur={handleOnBlur}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
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
  setFieldValue: PropTypes.func.isRequired,
};

export default memo(FormInput);
