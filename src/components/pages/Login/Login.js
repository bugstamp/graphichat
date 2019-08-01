import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';
import { fadeInUp, fadeIn } from 'react-animations';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import LoginContainer from '../../containers/LoginContainer';
import LoginForm from './LoginForm';

import withNotification from '../../common/HOC/withNotification';
import storage from '../../../storage';
import gql from '../../../gql';

import { getStyledProps } from '../../../styles';
import bgImage from '../../../assets/images/login-bg__1920_95.jpg';

const { CHECK_SESSION_EXPIRATION } = gql;

const Wrapper = styled(Grid)`
  flex: 1 auto;
  display: flex;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const fadeInAnimation = keyframes`${fadeIn}`;

const PresentationContainer = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  animation: 1s ${fadeInUpAnimation};
  animation-delay: 1s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  background: linear-gradient(to right, ${blue[100]} 0%, ${blue[500]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;

  h1 {
    font-weight: bold;
  }
`;

const SubTitle = styled.div`
  animation: 1s ${fadeInAnimation};
  animation-delay: 1.5s;
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  opacity: 0;
  color: #fff;

  h4 {
    font-weight: bold;
  }
`;

const FormContainer = styled.div`

`;

class Login extends Component {
  state = {
    form: false,
  }

  componentDidMount() {
    const { client, toggleNotification } = this.props;
    const { sessionExpired } = client.readQuery({ query: CHECK_SESSION_EXPIRATION });

    if (sessionExpired) {
      toggleNotification('SessionExpired was expired');
    }
  }

  toggleForm = () => {
    this.setState(({ form }) => ({ form: !form }));
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
          <Wrapper container>
            <PresentationContainer>
              <Title>
                <Typography variant="h1" align="center" gutterBottom>GraphiChat</Typography>
              </Title>
              <SubTitle>
                <div role="button">
                  <Typography variant="h4" align="center" gutterBottom>Try it now!</Typography>
                </div>
              </SubTitle>
            </PresentationContainer>
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
