import React from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
// eslint-disable-next-line
import gql from 'graphql-tag';

import Login from '../dumb/Login/Login';

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
    {(mutation, result) => render({ mutation, result, name: 'signIn' })}
  </Mutation>
);

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: String!, $profile: SocialProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const signInBySocial = ({ render }) => (
  <Mutation mutation={SIGN_IN_BY_SOCIAL}>
    {(mutation, result) => render({ mutation, result, name: 'signInBySocial' })}
  </Mutation>
);

// const SIGN_UP_ASYNC_VALIDATION = gql`
//   mutation SignUpAsyncValidation($field: String!, $value: String!) {
//     signUpAsyncValidation(field: $field, value: $value) {
//       field
//       valid
//     }
//   }
// `;

const Composed = adopt({
  signIn,
  signInBySocial,
});

const LoginContainer = () => (
  <Composed>
    {props => (<Login {...props} />)}
  </Composed>
);

export default LoginContainer;
