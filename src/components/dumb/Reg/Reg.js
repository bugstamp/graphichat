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
      const validStep = +step - 1;

      try {
        await checkToken(token);

        this.setState(() => ({ activeStep: validStep }));
      } catch (e) {
        history.push('/reg');
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
