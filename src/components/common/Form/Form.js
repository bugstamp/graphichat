import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  get, map, forEach, find, omit, isEmpty, set,
} from 'lodash';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

const FormWrapper = styled.form`
  width: 100%;
`;

class Form extends Component {
  state = {
    asyncErrors: {},
  }

  componentDidUpdate(prevProps) {
    const {
      result,
      setFieldError,
      onSuccess,
      onError,
    } = this.props;

    if (!prevProps.result.error && result.error) {
      const { graphQLErrors } = result.error;
      const { message, extensions } = graphQLErrors[0];
      const invalidField = get(extensions, 'exception.invalidField');

      if (invalidField) {
        setFieldError(invalidField, message);
      } else {
        onError(message);
      }
    }

    if (!prevProps.result.data && result.data) {
      onSuccess(result.data);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { asyncErrors } = this.state;
    const { setFieldError, onSubmit } = this.props;

    if (!isEmpty(asyncErrors)) {
      forEach(asyncErrors, (val, key) => setFieldError(key, val));
    } else {
      onSubmit();
    }
  }

  setAsyncError = (field, error) => {
    this.setState(({ asyncErrors }) => ({ asyncErrors: set(asyncErrors, field, error) }));
  }

  clearAsyncError = (field) => {
    this.setState(({ asyncErrors }) => ({ asyncErrors: omit(asyncErrors, field) }));
  }

  render() {
    const { asyncErrors } = this.state;
    const {
      fields,
      errors,
      setFieldError,
      touched,
      onChange,
      onBlur,
      onSubmit,
      result,
      submitButtonText,
      asyncValidationFields,
      isValidating,
    } = this.props;
    const { loading } = result;

    return (
      <FormWrapper onSubmit={this.onSubmit}>
        {
          map(fields, (field) => {
            const { name, type } = field;
            const isError = errors[name] && touched[name];
            const error = errors[name];
            const asyncValidationField = find(asyncValidationFields, { name });

            if (asyncValidationField) {
              const isAsyncError = !!asyncErrors[name];
              const asyncError = asyncErrors[name];

              return (
                <AsyncFormInput
                  {...field}
                  key={name}
                  error={error}
                  isError={isError || isAsyncError}
                  asyncError={asyncError}
                  setAsyncError={this.setAsyncError}
                  clearAsyncError={this.clearAsyncError}
                  onChange={onChange}
                  onBlur={onBlur}
                  mutation={asyncValidationField.validation.mutation}
                  result={asyncValidationField.validation.result}
                />
              );
            }

            return (
              <Choose>
                <When condition={type === 'password'}>
                  <FormInputPassword
                    {...field}
                    key={name}
                    isError={isError}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </When>
                <Otherwise>
                  <FormInput
                    {...field}
                    key={name}
                    error={error}
                    isError={isError}
                    onChange={onChange}
                    onBlur={onBlur}
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

export default Form;
