import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation SignIn($form: SignInForm!) {
    signIn(form: $form) {
      token
      refreshToken
    }
  }
`;

export const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
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
  mutation SignUpCompletion($form: SignUpCompletionForm!) {
    signUpCompletion(form: $form) {
      token
      refreshToken
    }
  }
`;

export const SIGN_UP_BY_SOCIAL = gql`
  mutation SignUpBySocial($social: SocialProfile!, $profile: SocialUserProfile!) {
    signUpBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      id
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      displayName
      firstName
      lastName
      status
    }
    myContacts {
      person {
        id
        username
        displayName
        firstName
        lastName
        status
      }
      messages {
        userId
        content
        timestamp
        edited
        read
      }
    }
  }
`;

export const GET_MY_CONTACTS = gql`
  query GetMyContacts {
    myContacts @client {
      person {
        id
        username
        displayName
        firstName
        lastName
        status
      }
      messages {
        userId
        content
        timestamp
        edited
        read
      }
    }
  }
`;

export const GET_ME_LOCAL = gql`
  query GetMeLocal {
    me @client {
      id
      username
      displayName
      firstName
      lastName
      status
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($searchValue: String!) {
    searchUsers(searchValue: $searchValue) {
      id
      username
      displayName
      firstName
      lastName
      status
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($userId: ID!) {
    addContact(userId: $userId) {
      person {
        id
        username
        displayName
        firstName
        lastName
        status
      }
      messages {
        userId
        content
        timestamp
        edited
        read
      }
    }
  }
`;
