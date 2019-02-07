import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, includes } from 'lodash';

import FormInput from './FormInput';
import FormInputPassword from './FormInputPassword';
import AsyncFormInput from './AsyncFormInput';
import FormSubmit from './FormSubmit';

const FormWrapper = styled.form`
  width: 100%;
`;

class Form extends Component {
  state = {
    showPassword: false,
  }

  toggleShowPassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  render() {
    const { showPassword } = this.state;
    const {
      formFields,
      asyncFields,
      values,
      errors,
      touched,
      onChange,
      onBlur,
      onSubmit,
      loading,
      mutation,
      asyncResult,
      asyncProcessing,
    } = this.props;

    return (
      <FormWrapper onSubmit={(event) => { event.preventDefault(); }}>
        {
          map(formFields, (field) => {
            const { name, type } = field;
            const isError = errors[name] && touched[name];
            const error = errors[name];

            return (
              <Choose>
                <When condition={includes(asyncFields, name)}>
                  <AsyncFormInput
                    {...field}
                    key={name}
                    isError={isError}
                    error={error}
                    onChange={onChange}
                    onBlur={onBlur}
                    mutation={mutation}
                    asyncResult={asyncResult}
                    asyncProcessing={asyncProcessing}
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
          onClick={onSubmit}
          loading={loading}
          text="Sign In"
        />
      </FormWrapper>
    );
  }
}

export default Form;
