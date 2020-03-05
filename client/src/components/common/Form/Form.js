import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { map } from 'lodash';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import FormInputRadio from './FormInputRadio';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

import { FormWrapper } from './styled';
import {
  formFieldsProps,
  mutationResultProps,
  formAsyncFieldsProps,
} from '../../propTypes';

const Form = (props) => {
  const {
    fields,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    validateField,
    validationSchema,
    result,
    submitButtonText,
    asyncFields,
  } = props;
  const { loading, error = {} } = result;

  useEffect(() => {
    if (error.graphQLErrors) {
      const { graphQLErrors } = error;
      const { message, data = null } = graphQLErrors[0];

      if (data) {
        const { invalidField } = data;

        if (invalidField) {
          setFieldError(invalidField, message);
        }
      }
    }
  }, [error, setFieldError]);

  const validate = useCallback(async (field, value) => {
    try {
      await yup.reach(validationSchema, field).validate(value);

      if (asyncFields[field]) {
        const { mutation } = asyncFields[field];

        await mutation({ variables: { value, field } });
      }
    } catch (e) {
      const { graphQLErrors } = e;

      if (graphQLErrors) {
        const { message: graphQlMessage } = graphQLErrors[0];

        setFieldError(field, graphQlMessage);
      } else {
        const { message } = e;

        setFieldError(field, message);
      }
    }
  }, [validationSchema, asyncFields, setFieldError]);

  return (
    <FormWrapper onSubmit={handleSubmit} autoComplete="on">
      {
        map(fields, (field) => {
          const {
            name,
            type,
            initialValue,
            ...fieldValues
          } = field;
          const errorMessage = errors[name];
          const isError = errorMessage && touched[name];

          return (
            <Choose>
              <When condition={asyncFields[name]}>
                <AsyncFormInput
                  {...fieldValues}
                  key={name}
                  name={name}
                  type={type}
                  error={errorMessage}
                  isError={isError}
                  result={asyncFields[name].result}
                  validate={validate}
                  validateField={validateField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              </When>
              <When condition={type === 'password'}>
                <FormInputPassword
                  {...fieldValues}
                  key={name}
                  name={name}
                  type={type}
                  error={errorMessage}
                  isError={isError}
                  validate={validate}
                  validateField={validateField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              </When>
              <When condition={type === 'radio'}>
                <FormInputRadio
                  {...fieldValues}
                  key={name}
                  name={name}
                  type={type}
                  validate={validate}
                  validateField={validateField}
                  onChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              </When>
              <Otherwise>
                <FormInput
                  {...fieldValues}
                  key={name}
                  name={name}
                  type={type}
                  error={errorMessage}
                  isError={isError}
                  validateField={validateField}
                  validate={validate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              </Otherwise>
            </Choose>
          );
        })
      }
      <FormSubmit loading={loading} text={submitButtonText} />
    </FormWrapper>
  );
};

Form.defaultProps = {
  errors: {},
  touched: {},
  submitButtonText: 'Submit',
  asyncFields: {},
};
Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape(formFieldsProps)).isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
  touched: PropTypes.objectOf(PropTypes.bool),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  result: PropTypes.shape(mutationResultProps).isRequired,
  submitButtonText: PropTypes.string,
  validateField: PropTypes.func.isRequired,
  validationSchema: PropTypes.objectOf(PropTypes.any).isRequired,
  asyncFields: PropTypes.objectOf(PropTypes.shape(formAsyncFieldsProps)),
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  handleSubmit: (form, { props: { mutation } }) => {
    mutation({ variables: { form } });
  },
  validateOnChange: false,
  validateOnBlur: false,
})(Form);
