import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { trim } from 'lodash';

import TextField from '@material-ui/core/TextField';

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
  formInputVariant,
  readOnly,
  margin,
  endAdornment,
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
    validateField(name, value);

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
        <TextField
          {...field}
          fullWidth
          variant={formInputVariant}
          label={label}
          id={name}
          type={type}
          error={isError}
          onChange={onChange}
          onBlur={handleOnBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          InputProps={{
            endAdornment,
            readOnly,
          }}
          InputLabelProps={{
            shrink,
            htmlFor: name,
          }}
          inputProps={{ onKeyDown }} //eslint-disable-line
          margin={margin}
          helperText={error}
        />
      )}
    </Field>
  );
};

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  error: undefined,
  isError: false,
  margin: 'dense',
  formInputVariant: 'outlined',
  readOnly: false,
  endAdornment: null,
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
  margin: PropTypes.string,
  formInputVariant: PropTypes.oneOf(['outlined', 'standard']),
  readOnly: PropTypes.bool,
  endAdornment: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default memo(FormInput);
