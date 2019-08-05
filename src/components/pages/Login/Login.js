import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import styled from 'styled-components';
import { backgrounds } from 'polished';

import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import LoginContainer from '../../containers/LoginContainer';
import LoginForm from './LoginForm';
import LoginPresentation from './LoginPresentation';

import withNotification from '../../common/HOC/withNotification';
import storage from '../../../storage';
import gql from '../../../gql';

import bgImage from '../../../assets/images/login-bg__1920_65.jpg';
// import {} from '../../../styles';

const { CHECK_SESSION_EXPIRATION } = gql;

const Wrapper = styled(Grid)`
  flex: 1 auto;
  display: flex;
  position: relative;
  ${backgrounds(`url(${bgImage})`, 'no-repeat')};
  background-size: cover;
  background-position: center;
`;

class Login extends Component {
  state = {
    formDrawer: false,
  }

  componentDidMount() {
    const { client, toggleNotification } = this.props;
    const { sessionExpired } = client.readQuery({ query: CHECK_SESSION_EXPIRATION });

    if (sessionExpired) {
      toggleNotification('SessionExpired was expired');
    }
  }

  toggleFormDrawer = () => {
    this.setState(({ formDrawer }) => ({ formDrawer: !formDrawer }));
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
    const { formDrawer } = this.state;

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
          <Wrapper container>
            <LoginPresentation formDrawer={formDrawer} toggleFormDrawer={this.toggleFormDrawer} />
            <Drawer open={formDrawer} onClose={this.toggleFormDrawer} anchor="right">
              <LoginForm
                signIn={signIn}
                signInBySocial={signInBySocial}
                toSignUp={this.toSignUp}
              />
            </Drawer>
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
