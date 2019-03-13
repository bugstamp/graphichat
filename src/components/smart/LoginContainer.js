import React from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
// eslint-disable-next-line
import gql from 'graphql-tag';
import { has, get } from 'lodash';

const createMutation = (name, gqlMutation, mutationProps = {}) => (connectorProps) => {
  const mutationConnectorPropsKey = `${name}Props`;
  const mutationConnectorProps = has(connectorProps, mutationConnectorPropsKey)
    ? get(connectorProps, mutationConnectorPropsKey)
    : {};
  const { render } = connectorProps;

  return (
    <Mutation
      mutation={gqlMutation}
      {...mutationProps}
      {...mutationConnectorProps}
    >
      {(mutation, result) => render({
        mutation,
        result,
        name,
      })}
    </Mutation>
  );
};

const SIGN_IN = gql`
  mutation SignIn($form: SignInForm!) {
    signIn(form: $form) {
      token
      refreshToken
    }
  }
`;

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const signIn = createMutation('signIn', SIGN_IN);
const signInBySocial = createMutation('signInBySocial', SIGN_IN_BY_SOCIAL);

const LoginContainer = adopt({
  signIn,
  signInBySocial,
});

export default LoginContainer;
