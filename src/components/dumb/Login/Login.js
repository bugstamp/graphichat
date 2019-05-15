import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import LoginContainer from '../../smart/LoginContainer';
import LoginForm from './LoginForm';

import withNotification from '../../common/HOC/withNotification';
import storage from '../../../storage';

import bgImage from '../../../assets/images/login-bg__1920_95.jpg';

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class Login extends Component {
  handleSuccess = ({ token, refreshToken }) => {
    const { history } = this.props;

    storage.setTokens(token, refreshToken);
    history.push('/');
  }

  handleError = (e) => {
    if (e.graphQLErrors) {
      const { toggleNotification } = this.props;
      const { graphQLErrors } = e;
      const { message, data: { invalidField } } = graphQLErrors[0];

      if (!invalidField) {
        toggleNotification(message);
      }
    }
  }

  toSignUp = () => {
    const { history } = this.props;

    history.push('/reg');
  }

  render() {
    return (
      <LoginContainer
        signInProps={{
          onCompleted: ({ signIn }) => this.handleSuccess(signIn),
          onError: this.handleError,
        }}
        signInBySocialProps={{
          onCompleted: ({ signInBySocial }) => this.handleSuccess(signInBySocial),
          onError: this.handleError,
        }}
      >
        {({ signIn, signInBySocial }) => (
          <Wrapper
            justify="center"
            alignItems="center"
            container
          >
            <LoginForm
              signIn={signIn}
              signInBySocial={signInBySocial}
              toSignUp={this.toSignUp}
            />
          </Wrapper>
        )}
      </LoginContainer>
    );
  }
}

export default withNotification(Login);
