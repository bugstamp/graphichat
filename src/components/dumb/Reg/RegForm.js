import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import styled from 'styled-components';
// import {} from 'polished';
import { map } from 'lodash';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        open: false,
        message: '',
      },
    };

    this.formId = 'signUp';
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

  handleSubmit = (form) => {
    const { signUp } = this.props;

    signUp.mutation({ variables: { form } });
  }

  handleSuccess = () => {
  }

  handleError = (message) => {
    this.toggleAlert(message);
  }

  render() {
    const { alert } = this.state;
    const { steps, activeStep, signUp, signUpAsyncValidation } = this.props;
    console.log(signUp);

    return (
      <Wrapper elevation={8}>
        <Header variant="h1" color="primary" align="center" gutterBottom>
          <Stepper>
            {
              map(steps, (label, index) => (
                <Step
                  key={index}
                  active={activeStep === index}
                  completed={index < activeStep}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))
            }
          </Stepper>
        </Header>
        <Choose>
          <When condition={activeStep === 0}>
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
                  formFields={this.formFields}
                  values={values}
                  errors={errors}
                  touched={touched}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                  onSuccess={this.handleSuccess}
                  onError={this.handleError}
                  result={signUp.result}
                  setFieldError={setFieldError}
                  asyncValidationFields={['username', 'email']}
                  asyncValidationMutation={signUpAsyncValidation.mutation}
                  asyncValidationResultMutation={signUpAsyncValidation.result}
                />
              )}
            </Formik>
            {/* <SocialMedia
              mutation={signInBySocial.mutation}
              result={signInBySocial.result}
              onSuccess={this.handleSuccess}
              onError={this.handleError}
            /> */}
          </When>
          <Otherwise>
            {null}
          </Otherwise>
        </Choose>
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

export default withRouter(SignUp);
