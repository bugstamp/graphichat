import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
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
import formConfig from '../../common/Form/formConfig';
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

    this.formIdStepOne = 'signUpStepOne';
    this.formConfigStepOne = formConfig(this.formIdStepOne);
    this.formIdStepTwo = 'signUpStepTwo';
    this.formConfigStepTwo = formConfig(this.formIdStepTwo);
  }

  toggleAlert = (message = '') => {
    this.setState(({ alert }) => ({
      alert: {
        open: !alert.open,
        message,
      },
    }));
  }

  handleSubmitSignUp = async (form) => {
    const { signUp } = this.props;

    signUp.mutation({ variables: { form } });
  }

  handleSubmitSignUpCompletion = async (form) => {
    const { signUpCompletion } = this.props;

    signUpCompletion.mutation({ variables: { form } });
  }

  handleSuccess = ({ token, refreshToken }) => {
    if (token && refreshToken) {
      const { history } = this.props;

      localStorage.setItem('chatkilla_tkn', token);
      localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);
      history.push('/');
    } else {
      this.setState({ completed: true });
    }
  }

  handleError = (message) => {
    this.toggleAlert(message);
  }

  render() {
    const { alert, completed } = this.state;
    const {
      steps,
      activeStep,
      signUpAsyncValidationUsername,
      signUpAsyncValidationEmail,
      signUp,
      signUpCompletion,
      signUpBySocial,
    } = this.props;

    return (
      <Wrapper elevation={8}>
        <Header variant="h1" color="primary" align="center" gutterBottom>
          <Stepper alternativeLabel activeStep={activeStep}>
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
            {'Your account had been successfuly completed.Check your email and confirm registration.'}
          </When>
          <When condition={activeStep === 0}>
            <Form
              {...this.formConfigStepOne}
              result={signUp.result}
              onSubmit={this.handleSubmitSignUp}
              onSuccess={this.handleSuccess}
              onError={this.handleError}
              submitButtonText="Confirm"
              asyncValidationFields={[{
                name: 'username',
                validation: signUpAsyncValidationUsername,
              }, {
                name: 'email',
                validation: signUpAsyncValidationEmail,
              }]}
            />
            <SocialMedia
              mutation={signUpBySocial.mutation}
              result={signUpBySocial.result}
              onSuccess={this.handleSuccess}
              onError={this.handleError}
              note="Sign Up with social media:"
            />
          </When>
          <When condition={activeStep === 1}>
            <Form
              {...this.formConfigStepTwo}
              result={signUpCompletion.result}
              onSubmit={this.handleSubmitSignUpCompletion}
              onSuccess={this.handleSuccess}
              onError={this.handleError}
              submitButtonText="Confirm"
            />
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
