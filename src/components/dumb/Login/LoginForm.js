import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
// import {} from 'polished';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import Button from '@material-ui/core/Button';

import Form from '../../common/Form/Form';
import { formFields, formValidationSchemas } from '../../common/Form/config';
import SocialMedia from './SocialMedia/SocialMedia';
import Notification from '../../common/Notification';

import { getPadding } from '../../../styles';

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: String!, $profile: SocialProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const SIGN_UP_ASYNC_VALIDATION = gql`
  mutation SignUpAsyncValidation($field: String!, $value: String!) {
    signUpAsyncValidation(field: $field, value: $value) {
      field
      valid
    }
  }
`;

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    max-width: 375px;
    min-width: 320px;
  padding: ${getPadding(5)} ${getPadding(3)};
  }
`;

const Header = styled(Typography)`
  width: 100%;
  position: relative;
  text-align: center;
`;

const SignUpButton = styled(Button)`
  && {
    margin-top: 1em;
  }
`;

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        open: false,
        message: '',
      },
    };

    this.formId = 'signin';
    this.formFields = formFields[this.formId];
    this.formValidationSchema = formValidationSchemas[this.formId];
  }

  toggleAlert = (message = '') => {
    this.setState(({ alert }) => ({
      alert: {
        open: !alert.open,
        message,
      },
    }));
  }

  signInSuccess = ({ token, refreshToken }) => {
    const { history } = this.props;

    localStorage.setItem('chatkilla_tkn', token);
    localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);
    history.push('/');
  }

  signUp = () => {
    const { history } = this.props;

    history.push('/login/new');
  }

  render() {
    const { alert } = this.state;

    return (
      <Mutation
        mutation={SIGN_IN}
        update={(cache, { data: { signIn } }) => {
          this.signInSuccess(signIn);
        }}
        onError={({ graphQLErrors }) => {
          this.toggleAlert(graphQLErrors[0].message);
        }}
      >
        {(signIn, { loading }) => {
          return (
            <Wrapper elevation={8}>
              <Header variant="h1" color="primary" align="center" gutterBottom>
                <AccountCircleIcon fontSize="inherit" color="primary" />
              </Header>
              <Formik
                validationSchema={this.formValidationSchema}
                onSubmit={({ username, password }) => signIn({ variables: { username, password } })}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldError,
                }) => {
                  return (
                    <Mutation
                      mutation={SIGN_UP_ASYNC_VALIDATION}
                      onError={({ graphQLErrors }) => {
                        const { message, extensions } = graphQLErrors[0];
                        const { exception: { invalidField } } = extensions;

                        setFieldError(invalidField, message);
                      }}
                    >
                      {(signUpAsyncValidation, { loading: asyncValidationProcessing, data }) => (
                        <Form
                          formFields={this.formFields}
                          loading={loading}
                          values={values}
                          errors={errors}
                          touched={touched}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onSubmit={handleSubmit}
                          mutation={signUpAsyncValidation}
                          asyncFields={['username']}
                          asyncResult={data}
                          asyncProcessing={asyncValidationProcessing}
                        />
                      )}
                    </Mutation>
                  );
                }}
              </Formik>
              <SignUpButton
                onClick={this.signUp}
                color="primary"
                size="large"
                variant="outlined"
                fullWidth
              >
                {'Sign Up'}
              </SignUpButton>
              <Mutation
                mutation={SIGN_IN_BY_SOCIAL}
                update={(cache, { data: { signInBySocial } }) => {
                  this.signInSuccess(signInBySocial);
                }}
                onError={({ graphQLErrors }) => {
                  this.toggleAlert(graphQLErrors[0].message);
                }}
              >
                {(signInBySocial, { loading: socialLoading }) => {
                  return (<SocialMedia loading={socialLoading} mutation={signInBySocial} />);
                }}
              </Mutation>
              <Notification
                type="error"
                open={alert.open}
                message={alert.message}
                toggle={() => this.toggleAlert()}
              />
            </Wrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
