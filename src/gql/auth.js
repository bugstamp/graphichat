import gql from 'graphql-tag';

import { authPayloadFragment } from './fragments';

const SIGN_IN = gql`
  mutation SignIn($form: SignInForm!) {
    signIn(form: $form) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

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
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

const SIGN_UP_BY_SOCIAL = gql`
  mutation SignUpBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signUpBySocial(social: $social, profile: $profile) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

const SIGN_OUT = gql`
  mutation SignOut($userId: String) {
    signOut(userId: $userId)
  }
`;

const CHECK_SESSION_EXPIRATION = gql`
  {
    sessionExpired @client
  }
`;

export default {
  SIGN_IN,
  SIGN_IN_BY_SOCIAL,
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
  SIGN_OUT,
  CHECK_SESSION_EXPIRATION,
};
