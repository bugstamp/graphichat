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

  componentDidMount() {
  }

  render() {
    return (
      <Wrapper
        ref={this.createRef}
        justify="center"
        alignItems="center"
        container
      >
        {null}
      </Wrapper>
    );
  }
}

export default SignUp;
