import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import styled from 'styled-components';
// import {} from 'polished';
// import {} from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import Button from '@material-ui/core/Button';

import Form from '../../common/Form/Form';
import { formFields, formValidationSchemas } from '../../common/Form/config';
import SocialMedia from '../../common/SocialMedia/SocialMedia';
import Notification from '../../common/Notification';

import { getPadding } from '../../../styles';

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

    this.formId = 'signIn';
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

  handleSubmit = ({ username, password }) => {
    const { signIn, signInBySocial } = this.props;

    signIn.mutation({ variables: { username, password } });
  }

  handleSuccess = ({ token, refreshToken }) => {
    const { history } = this.props;

    localStorage.setItem('chatkilla_tkn', token);
    localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);
    history.push('/');
  }

  handleError = (message) => {
    this.toggleAlert(message);
  }

  signUp = () => {
    const { history } = this.props;

    history.push('/reg');
  }

  render() {
    const { alert } = this.state;
    const { signIn, signInBySocial } = this.props;

    return (
      <Wrapper elevation={8}>
        <Header variant="h1" color="primary" align="center" gutterBottom>
          <AccountCircleIcon fontSize="inherit" color="primary" />
        </Header>
        <Formik
          validationSchema={this.formValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldError,
          }) => (
            <Form
              fields={this.formFields}
              values={values}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              onSuccess={this.handleSuccess}
              onError={this.handleError}
              result={signIn.result}
              setFieldError={setFieldError}
              submitButtonText="Sign In"
            />
          )}
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
        <SocialMedia
          mutation={signInBySocial.mutation}
          result={signInBySocial.result}
          onSuccess={this.handleSuccess}
          onError={this.handleError}
          note="Sign in with social media:"
        />
        <Notification
          type="error"
          open={alert.open}
          message={alert.message}
          toggle={() => this.toggleAlert()}
        />
      </Wrapper>
    );
  }
}

export default withRouter(LoginForm);
