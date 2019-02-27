import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import RegForm from './RegForm';
import bgImage from '../../../assets/images/reg-bg.jpg';

import { checkToken } from '../../../router/PrivateRoute';

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class SignUp extends Component {
  state = {
    activeStep: 0,
  }

  steps = [
    'Create your account',
    'Tell us about yourself',
  ];

  async componentDidMount() {
    const { location: { search }, history } = this.props;
    const { step, token } = queryString.parse(search);

    if (step && token) {
      try {
        await checkToken(token);
        this.setActiveStep(+step - 1);
      } catch (e) {
        history.push('/reg');
      }
    }
  }

  setActiveStep = (step) => {
    this.setState(() => ({ activeStep: step }));
  }

  render() {
    const { activeStep } = this.state;
    const {
      signUpAsyncValidationUsername,
      signUpAsyncValidationEmail,
      signUp,
      signUpCompletion,
      signUpBySocial,
    } = this.props;

    return (
      <Wrapper
        ref={this.createRef}
        justify="center"
        alignItems="center"
        container
      >
        <RegForm
          steps={this.steps}
          activeStep={activeStep}
          signUpAsyncValidationUsername={signUpAsyncValidationUsername}
          signUpAsyncValidationEmail={signUpAsyncValidationEmail}
          signUp={signUp}
          signUpCompletion={signUpCompletion}
          signUpBySocial={signUpBySocial}
          setActiveStep={this.setActiveStep}
        />
      </Wrapper>
    );
  }
}

export default SignUp;
