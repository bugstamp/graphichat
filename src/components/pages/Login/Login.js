import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import Grid from '@material-ui/core/Grid';

import LoginContainer from '../../containers/LoginContainer';
import LoginForm from './LoginForm';

import withNotification from '../../common/HOC/withNotification';
import storage from '../../../storage';
import gql from '../../../gql';

import bgImage from '../../../assets/images/login-bg__1920_95.jpg';

const { CHECK_SESSION_EXPIRATION } = gql;

const Wrapper = styled(Grid)`
  flex: 1 auto;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

class Login extends Component {
  componentDidMount() {
    const { client, toggleNotification } = this.props;
    const { sessionExpired } = client.readQuery({ query: CHECK_SESSION_EXPIRATION });

    if (sessionExpired) {
      toggleNotification('SessionExpired was expired');
    }
  }

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
        {({
          signIn,
          signInBySocial,
        }) => (
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

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleNotification: PropTypes.func.isRequired,
  client: PropTypes.shape({
    readQuery: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(withNotification(Login));
