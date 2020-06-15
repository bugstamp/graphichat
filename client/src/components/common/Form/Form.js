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

import formConfig from './formConfig';

import { FormWrapper } from './styled';
import { mutationResultProps } from '../../propTypes';

const Form = (props) => {
  const {
    formId,
    asyncFields,
    result,
    submitButtonText,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    validateField,
    resetForm,
    formInputVariant,
    readOnly,
  } = props;
  const { fields } = formConfig(formId);
  const { loading, error = {} } = result;

  useEffect(() => {
    if (readOnly) {
      resetForm();
    }
  }, [readOnly, resetForm]);

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

  const validate = useCallback(async (field, value, asyncValidateCb = null) => {
    try {
      const { validationSchema } = formConfig(formId);
      await yup.reach(validationSchema, field).validate(value);

      if (asyncFields.includes(field)) {
        await asyncValidateCb(field, value);
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
  }, [formId]); //eslint-disable-line

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
              <When condition={asyncFields.includes(name)}>
                <AsyncFormInput
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
                  formInputVariant={formInputVariant}
                  readOnly={readOnly}
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
                  formInputVariant={formInputVariant}
                  readOnly={readOnly}
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
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  readOnly={readOnly}
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
                  formInputVariant={formInputVariant}
                  readOnly={readOnly}
                />
              </Otherwise>
            </Choose>
          );
        })
      }
      <If condition={!readOnly}>
        <FormSubmit loading={loading} text={submitButtonText} />
      </If>
    </FormWrapper>
  );
};

Form.defaultProps = {
  asyncFields: [],
  initialValues: null,
  submitButtonText: 'Submit',
  errors: {},
  touched: {},
  formInputVariant: 'standard',
  readOnly: false,
};
Form.propTypes = {
  formId: PropTypes.string.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any),
  asyncFields: PropTypes.arrayOf(PropTypes.string),
  result: PropTypes.shape(mutationResultProps).isRequired,
  submitButtonText: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
  touched: PropTypes.objectOf(PropTypes.bool),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  formInputVariant: PropTypes.oneOf(['outlined', 'standard']),
  readOnly: PropTypes.bool,
};

export default withFormik({
  mapPropsToValues: ({ formId, initialValues }) => {
    const { fields, initialValues: defaultValues } = formConfig(formId);

    if (initialValues) {
      return fields.reduce((acc, { name }) => {
        acc[name] = initialValues[name];

        return acc;
      }, {});
    }
    return defaultValues;
  },
  handleSubmit: (form, { props: { mutation } }) => {
    mutation({ variables: { form } });
  },
  validationSchema: ({ formId }) => {
    const { validationSchema } = formConfig(formId);

    return validationSchema;
  },
  validateOnChange: false,
  validateOnBlur: false,
})(Form);
