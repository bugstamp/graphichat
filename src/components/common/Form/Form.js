import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { map, find, isEmpty } from 'lodash';
import * as yup from 'yup';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import FormInputRadio from './FormInputRadio';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

const FormWrapper = styled.form`
  width: 100%;
`;

class Form extends Component {
  componentDidUpdate(prevProps) {
    const { result: { error }, setFieldError } = this.props;

    if (!prevProps.result.error && error) {
      if (error.graphQLErrors) {
        const { graphQLErrors } = error;
        const { message, data: { invalidField } } = graphQLErrors[0];

        if (invalidField) {
          setFieldError(invalidField, message);
        }
      }
    }
  }

  validate = async (value, field) => {
    const { validationSchema, asyncValidationFields } = this.props;
    const asyncValidationField = find(asyncValidationFields, { name: field });

    try {
      await yup.reach(validationSchema, field).validate(value);

      if (asyncValidationField) {
        const { validation } = asyncValidationField;

        await validation.mutation({ variables: { field, value } });
      }
    } catch ({ message, graphQLErrors }) {
      if (graphQLErrors) {
        const { message: graphQlMessage } = graphQLErrors[0];

        throw graphQlMessage;
      }
      throw message;
    }
  }

  render() {
    const {
      fields,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      result,
      submitButtonText,
      validateField,
      validate,
      asyncValidationFields,
    } = this.props;
    const { loading } = result;

    return (
      <FormWrapper onSubmit={handleSubmit}>
        {
          map(fields, (field) => {
            const {
              name,
              type,
              initialValue,
              ...values
            } = field;
            const error = errors[name];
            const isError = error && touched[name];
            const asyncValidationField = find(asyncValidationFields, { name });

            return (
              <Choose>
                <When condition={asyncValidationField}>
                  <AsyncFormInput
                    {...values}
                    key={name}
                    name={name}
                    type={type}
                    error={error}
                    isError={isError}
                    result={asyncValidationField.validation.result}
                    validateField={validateField}
                    validate={this.validate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </When>
                <When condition={type === 'password'}>
                  <FormInputPassword
                    {...values}
                    key={name}
                    name={name}
                    type={type}
                    isError={isError}
                    error={error}
                    validateField={validateField}
                    validate={this.validate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </When>
                <When condition={type === 'radio'}>
                  <FormInputRadio
                    {...values}
                    key={name}
                    name={name}
                    type={type}
                    validateField={validateField}
                    validate={this.validate}
                    onChange={handleChange}
                  />
                </When>
                <Otherwise>
                  <FormInput
                    {...values}
                    key={name}
                    name={name}
                    type={type}
                    error={error}
                    isError={isError}
                    validateField={validateField}
                    validate={this.validate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Otherwise>
              </Choose>
            );
          })
        }
        <FormSubmit loading={loading} text={submitButtonText} />
      </FormWrapper>
    );
  }
}

export default withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,

  handleSubmit: (
    values, { props: { mutation } },
  ) => {
    mutation({ variables: { form: values } });
  },

  validateOnChange: false,
  validateOnBlur: false,
})(Form);
