import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { map, find } from 'lodash';
import styled from 'styled-components';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import FormInputRadio from './FormInputRadio';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

import {
  formFieldsProps,
  mutationResultProps,
  formAsyncValidationFieldsProps,
} from '../../propTypes';

const FormStyled = styled.form`
  width: 100%;
`;

class Form extends Component {
  componentDidUpdate(prevProps) {
    const { result, setFieldError } = this.props;

    if (!prevProps.result.error && result.error) {
      if (result.error.graphQLErrors) {
        const { graphQLErrors } = result.error;
        const { message, data = null } = graphQLErrors[0];

        if (data) {
          const { invalidField } = data;

          if (invalidField) {
            setFieldError(invalidField, message);
          }
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

        await validation.mutation({ variables: { value, field } });
      }
    } catch ({ message, graphQLErrors }) {
      if (graphQLErrors) {
        const { message: graphQlMessage } = graphQLErrors[0];

        throw graphQlMessage;
      }
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
      asyncValidationFields,
    } = this.props;
    const { loading } = result;

    return (
      <FormStyled onSubmit={handleSubmit} autoComplete="on">
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
                    validate={this.validate}
                    validateField={validateField}
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
      </FormStyled>
    );
  }
}

Form.defaultProps = {
  errors: {},
  touched: {},
  submitButtonText: 'Submit',
  asyncValidationFields: [],
};
Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape(formFieldsProps)).isRequired,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
  touched: PropTypes.objectOf(PropTypes.bool),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  result: PropTypes.shape(mutationResultProps).isRequired,
  submitButtonText: PropTypes.string,
  validateField: PropTypes.func.isRequired,
  validationSchema: PropTypes.objectOf(PropTypes.any).isRequired,
  asyncValidationFields: PropTypes.arrayOf(PropTypes.shape(formAsyncValidationFieldsProps)),
};

export default withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,

  handleSubmit: (form, { props: { mutation } }) => {
    mutation({ variables: { form } });
  },

  validateOnChange: false,
  validateOnBlur: false,
})(Form);
