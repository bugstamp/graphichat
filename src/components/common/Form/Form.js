import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  get, map, includes, keys,
} from 'lodash';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

const FormWrapper = styled.form`
  width: 100%;
`;

class Form extends Component {
  componentDidUpdate(prevProps) {
    const { result: { error, data }, setFieldError, onSuccess, onError } = this.props;

    if (!prevProps.result.error && error) {
      const { graphQLErrors } = error;
      const { message, extensions } = graphQLErrors[0];
      const invalidField = get(extensions, 'exception.invalidField');

      if (invalidField) {
        setFieldError(invalidField, message);
      } else {
        onError(message);
      }
    }

    if (!prevProps.result.data && data) {
      onSuccess(data[keys(data)[0]]);
    }
  }

  render() {
    const {
      formFields,
      errors,
      touched,
      onChange,
      onBlur,
      onSubmit,
      result,
      asyncValidationFields,
      asyncValidationMutation,
      asyncValidationResult,
    } = this.props;
    const { loading } = result;

    return (
      <FormWrapper onSubmit={onSubmit}>
        {
          map(formFields, (field) => {
            const { name, type } = field;
            const isError = errors[name] && touched[name];
            const error = errors[name];

            return (
              <Choose>
                <When condition={includes(asyncValidationFields, name)}>
                  <AsyncFormInput
                    {...field}
                    key={name}
                    isError={isError}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                    mutation={asyncValidationMutation}
                    result={asyncValidationResult}
                  />
                </When>
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
                    isError={isError}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </Otherwise>
              </Choose>
            );
          })
        }
        <FormSubmit
          loading={loading}
          text="Sign In"
        />
      </FormWrapper>
    );
  }
}

export default Form;
