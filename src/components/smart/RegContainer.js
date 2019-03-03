import React from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
// eslint-disable-next-line
import gql from 'graphql-tag';

import Reg from '../dumb/Reg/Reg';
import mapMutationProps from './mapMutationProps';

const SIGN_UP_ASYNC_VALIDATION = gql`
  mutation SignUpAsyncValidation($field: String!, $value: String!) {
    signUpAsyncValidation(field: $field, value: $value) {
      field
      valid
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($form: SignUpForm!) {
    signUp(form: $form)
  }
`;

const SIGN_UP_COMPLETION = gql`
  mutation SignUpCompletion($form: SignUpCompletionForm!) {
    signUpCompletion(form: $form) {
      token
      refreshToken
    }
  }
`;

const SIGN_UP_BY_SOCIAL = gql`
  mutation SignUpBySocial($social: String!, $profile: SocialProfile!) {
    signUpBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const signUpAsyncValidationUsername = ({ render }) => (
  <Mutation mutation={SIGN_UP_ASYNC_VALIDATION}>
    {mapMutationProps(render, 'signUpAsyncValidation')}
  </Mutation>
);

const signUpAsyncValidationEmail = ({ render }) => (
  <Mutation mutation={SIGN_UP_ASYNC_VALIDATION}>
    {mapMutationProps(render, 'signUpAsyncValidation')}
  </Mutation>
);

const signUp = ({ render }) => (
  <Mutation mutation={SIGN_UP}>
    {mapMutationProps(render, 'signUp')}
  </Mutation>
);

const signUpCompletion = ({ render }) => (
  <Mutation mutation={SIGN_UP_COMPLETION}>
    {mapMutationProps(render, 'signUpCompletion')}
  </Mutation>
);

const signUpBySocial = ({ render }) => (
  <Mutation mutation={SIGN_UP_BY_SOCIAL}>
    {mapMutationProps(render, 'signUpBySocial')}
  </Mutation>
);

const Composed = adopt({
  signUpAsyncValidationUsername,
  signUpAsyncValidationEmail,
  signUp,
  signUpCompletion,
  signUpBySocial,
});

const RegContainer = ownProps => (
  <Composed>
    {props => (<Reg {...props} {...ownProps} />)}
  </Composed>
);

export default RegContainer;
