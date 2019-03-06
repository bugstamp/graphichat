import React from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
// eslint-disable-next-line
import gql from 'graphql-tag';

import Login from '../dumb/Login/Login';
import mapMutationProps from './mapMutationProps';

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

const signIn = ({ render }) => (
  <Mutation mutation={SIGN_IN}>
    {mapMutationProps(render, 'signIn')}
  </Mutation>
);

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const signInBySocial = ({ render }) => (
  <Mutation mutation={SIGN_IN_BY_SOCIAL}>
    {mapMutationProps(render, 'signInBySocial')}
  </Mutation>
);

const Composed = adopt({
  signIn,
  signInBySocial,
});

const LoginContainer = ownProps => (
  <Composed>
    {props => (<Login {...props} {...ownProps} />)}
  </Composed>
);

export default LoginContainer;
