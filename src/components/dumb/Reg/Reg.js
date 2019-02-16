import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import RegForm from './RegForm';
import bgImage from '../../../assets/images/reg-bg.jpg';

import { checkAuth } from '../../../router/PrivateRoute';

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class SignUp extends Component {
  state = {
    activeStep: 1,
  }

  steps = [
    'Step 1. Create your account.',
    'Step 2. Tell us a bit about yourself.',
  ];

  async componentDidMount() {
    const { location: { search } } = this.props;
    const { step, token } = queryString.parse(search);

    if (step && token) {
      try {
        await checkAuth(token);

        this.setState({ activeStep: step });
      } catch (e) {
        throw e;
      }
    }
  }

  render() {
    const { activeStep } = this.state;
    const {
      signUp,
      signUpAsyncValidationUsername,
      signUpAsyncValidationEmail,
    } = this.props;

    return (
      <Wrapper
        ref={this.createRef}
        justify="center"
        alignItems="center"
        container
      >
        <RegForm
          signUp={signUp}
          signUpAsyncValidationUsername={signUpAsyncValidationUsername}
          signUpAsyncValidationEmail={signUpAsyncValidationEmail}
          activeStep={activeStep}
          steps={this.steps}
        />
      </Wrapper>
    );
  }
}

export default SignUp;
