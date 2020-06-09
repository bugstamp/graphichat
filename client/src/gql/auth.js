import { gql } from 'apollo-boost';

import { authPayloadFragment } from './fragments';

export const SIGN_IN = gql`
  mutation SignIn($form: SignInForm!) {
    signIn(form: $form) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

export const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

export const SIGN_UP_ASYNC_VALIDATION = gql`
  mutation SignUpAsyncValidation($field: String!, $value: String!) {
    signUpAsyncValidation(field: $field, value: $value) {
      field
      valid
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($form: SignUpForm!) {
    signUp(form: $form)
  }
`;

export const SIGN_UP_COMPLETION = gql`
  mutation SignUpCompletion($id: String!, $form: SignUpCompletionForm!) {
    signUpCompletion(id: $id, form: $form) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

export const SIGN_UP_BY_SOCIAL = gql`
  mutation SignUpBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signUpBySocial(social: $social, profile: $profile) {
      ...tokens
    }
  }
  ${authPayloadFragment}
`;

export const SIGN_OUT = gql`
  mutation SignOut($userId: String) {
    signOut(userId: $userId)
  }
`;

export const CHECK_SESSION_EXPIRATION = gql`
  {
    sessionExpired @client
  }
`;
