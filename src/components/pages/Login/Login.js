import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';
import { fadeIn } from 'react-animations';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import LoginContainer from '../../containers/LoginContainer';
import LoginForm from './LoginForm';
import BrandTitle from './BrandTitle';

import withNotification from '../../common/HOC/withNotification';
import storage from '../../../storage';
import gql from '../../../gql';

import { getStyledProps, getSpacing } from '../../../styles';
import bgImage from '../../../assets/images/login-bg__1920_95.jpg';

const { CHECK_SESSION_EXPIRATION } = gql;

const fadeInAnimation = keyframes`${fadeIn}`;

const Wrapper = styled(Grid)`
  flex: 1 auto;
  display: flex;
  position: relative;
  ${backgrounds(`url(${bgImage})`, 'center no-repeat')}
  background-size: cover;
`;

const Presentation = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
  animation: 1s ${fadeInAnimation};
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  color: #fff;
  padding: 0 ${getSpacing(1)};
  text-align: center;
  opacity: 0;

  h4 {
    font-weight: bold;
  }

  button {
    display: inline-block;
    border: none;
    outline: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: ${getStyledProps('theme.palette.primary.main')}
    }
  }
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
    const { form } = this.state;

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
            <Presentation>
              <BrandTitle />
              <SubTitle>
                <Typography variant="h4" align="center" gutterBottom>
                  {'A lightweight, useful and speed full web chat app'}
                  {' based on the modern GraphQL API'}
                </Typography>
                <button type="button" onClick={this.toggleForm}>
                  <Typography variant="h4" align="center">Try it now!</Typography>
                </button>
              </SubTitle>
            </Presentation>
            <Drawer open={form} onClose={this.toggleForm} anchor="right">
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
