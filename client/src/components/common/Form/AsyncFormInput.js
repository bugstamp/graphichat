import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import FormInput from './FormInput';
import AsyncFormInputAdornment from './AsyncFormInputAdornment';

import gql from '../../../gql';

const {
  SIGN_UP_ASYNC_VALIDATION,
} = gql;

const AsyncFormInput = (props) => {
  const {
    validate,
    validateField,
    ...rest
  } = props;
  const [valid, setValid] = useState(false);
  const [asyncValidation, { loading, data, error }] = useMutation(SIGN_UP_ASYNC_VALIDATION);

  const asyncValidateCb = useCallback(async (name, value) => {
    await asyncValidation({ variables: { field: name, value } });
  }, [asyncValidation]);

  const handleAsyncValidate = useCallback((name, value) => {
    validate(name, value, asyncValidateCb);
  }, [validate, asyncValidateCb]);

  const handleAsyncValidateField = useCallback((name, value) => {
    validateField(name, value, asyncValidateCb);
  }, [validateField, asyncValidateCb]);

  useEffect(() => {
    if (data) {
      setValid(true);
    }
    if (error) {
      setValid(false);
    }
  }, [data, error]);

  const memoizedInputAdornment = useMemo(
    () => (<AsyncFormInputAdornment loading={loading} isSuccess={valid} />),
    [loading, valid],
  );

  return (
    <FormInput
      {...rest}
      validate={handleAsyncValidate}
      validateField={handleAsyncValidateField}
      endAdornment={memoizedInputAdornment}
    />
  );
};

AsyncFormInput.propTypes = {
  validate: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
};

export default AsyncFormInput;
