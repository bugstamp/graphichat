import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import LoginContainer from '../../smart/LoginContainer';
import LoginForm from './LoginForm';
import bgImage from '../../../assets/images/login-bg.jpg';
import Notification from '../../common/Notification';

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        open: false,
        message: '',
      },
    };
  }

  toggleAlert = (message = '') => {
    this.setState(({ alert: { open } }) => ({
      alert: {
        open: !open,
        message,
      },
    }));
  }

  handleSuccess = ({ token, refreshToken }) => {
    const { history } = this.props;

    localStorage.setItem('chatkilla_tkn', token);
    localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);
    history.push('/');
  }

  handleError = (e) => {
    if (e.graphQLErrors) {
      const { graphQLErrors } = e;
      const { message, data: { invalidField } } = graphQLErrors[0];

      if (!invalidField) {
        this.toggleAlert(message);
      }
    }
  }

  toSignUp = () => {
    const { history } = this.props;

    history.push('/reg');
  }

  render() {
    const { alert } = this.state;

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
            <Notification
              type="error"
              open={alert.open}
              message={alert.message}
              toggle={() => this.toggleAlert()}
            />
          </Wrapper>
        )}
      </LoginContainer>
    );
  }
}

export default Login;
