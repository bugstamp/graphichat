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
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import InfoIcon from '@material-ui/icons/InfoRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';

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

const StepLabelStyled = styled(StepLabel)`
  p {
    width: 100%;
  }
`;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        open: false,
        message: '',
      },
      completed: false,
    };

    this.formId = 'signUpStepOne';
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
    this.setState({ completed: true });
  }

  handleError = (message) => {
    this.toggleAlert(message);
  }

  render() {
    const { alert, completed } = this.state;
    const {
      steps,
      activeStep,
      signUp,
      signUpAsyncValidationUsername,
      signUpAsyncValidationEmail,
    } = this.props;

    return (
      <Wrapper elevation={8}>
        <Header variant="h1" color="primary" align="center" gutterBottom>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
          >
            {
              map(steps, (label, index) => {
                const isActive = activeStep === index;
                const isCompleted = index < activeStep;
                const iconColor = (!isCompleted && !isActive)
                  ? 'disabled'
                  : 'primary';

                return (
                  <Step
                    key={index}
                    active={isActive}
                    completed={isCompleted}
                  >
                    <StepLabelStyled
                      icon={(
                        <Choose>
                          <When condition={isCompleted}>
                            <CheckCircleIcon color={iconColor} />
                          </When>
                          <When condition={index === 0}>
                            <AccountCircleIcon color={iconColor} />
                          </When>
                          <Otherwise>
                            <InfoIcon color={iconColor} />
                          </Otherwise>
                        </Choose>
                      )}
                    >
                      <span>{`Step ${index + 1}.`}</span>
                      <p>{label}</p>
                    </StepLabelStyled>
                  </Step>
                );
              })
            }
          </Stepper>
        </Header>
        <Choose>
          <When condition={completed}>
            {'Your account had been successfuly completed.Check your email and confirm your email.'}
          </When>
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
                isValidating,
              }) => (
                <Form
                  isValidating={isValidating}
                  fields={this.formFields}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldError={setFieldError}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onSubmit={handleSubmit}
                  onSuccess={this.handleSuccess}
                  onError={this.handleError}
                  result={signUp.result}
                  submitButtonText="Confirm"
                  asyncValidationFields={[{
                    name: 'username',
                    validation: signUpAsyncValidationUsername,
                  }, {
                    name: 'email',
                    validation: signUpAsyncValidationEmail,
                  }]}
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
