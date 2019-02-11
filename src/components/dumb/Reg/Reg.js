import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import RegForm from './RegForm';
import bgImage from '../../../assets/images/reg-bg.jpg';

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
    'Step 1. Create your account.',
    'Step 2. Tell us a little about yourself.',
  ];

  render() {
    const { activeStep } = this.state;
    const { signUp, signUpAsyncValidation } = this.props;

    return (
      <Wrapper
        ref={this.createRef}
        justify="center"
        alignItems="center"
        container
      >
        <RegForm
          signUp={signUp}
          signUpAsyncValidation={signUpAsyncValidation}
          activeStep={activeStep}
          steps={this.steps}
        />
      </Wrapper>
    );
  }
}

export default SignUp;
