import gql from 'graphql-tag';

const authPayloadFragment = gql`
  fragment tokens on AuthPayload {
    token
    refreshToken
  }
`;

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
  mutation SignUpCompletion($form: SignUpCompletionForm!) {
    signUpCompletion(form: $form) {
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
  mutation SignOut {
    signOut
  }
`;

const myFragment = gql`
  fragment myData on User {
    id
    username
    displayName
    firstName
    lastName
    status
  }
`;

const myContactFragment = gql`
  fragment myContactData on MyContact {
    chatId
    userInfo {
      id
      username
      displayName
      firstName
      lastName
      status
    }
  }
`;

const myChatFragment = gql`
  fragment myChatData on Chat {
    id
    history {
      date
      messages {
        senderId
        type
        content
        time
        edited
        seen
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      ...myData
    }
    myContacts {
      ...myContactData
    }
    myChats {
      ...myChatData
    }
  }
  ${myContactFragment}
  ${myChatFragment}
  ${myFragment}
`;

export const GET_ME_LOCAL = gql`
  query GetMeLocal {
    me @client {
      ...myData
    }
  }
  ${myFragment}
`;

export const GET_MY_CONTACTS = gql`
  query GetMyContacts {
    myContacts @client {
      ...myContactData
    }
  }
  ${myContactFragment}
`;

export const GET_MY_CHATS = gql`
  query GetMyChats {
    myContacts @client {
      ...myContactData
    }
    myChats @client {
      ...myChatData
    }
  }
  ${myContactFragment}
  ${myChatFragment}
`;

export const SEARCH_USERS = gql`
  query SearchUsers($searchValue: String!) {
    searchUsers(searchValue: $searchValue) {
      ...myData
    }
  }
  ${myFragment}
`;

export const CREATE_CHAT = gql`
  mutation createChat($userId: ID!) {
    createChat(userId: $userId) {
      contact {
        ...myContactData
      }
      chat {
        ...myChatData
      }
    }
  }
  ${myContactFragment}
  ${myChatFragment}
`;

export const CREATE_CHAT_SUBSCRIPTION = gql`
  subscription onChatCreated {
    chatCreated {
      contact {
        ...myContactData
      }
      chat {
        ...myChatData
      }
    }
  }
  ${myContactFragment}
  ${myChatFragment}
`;

export const GET_SESSION_EXPIRED = gql`
  {
    sessionExpired @client
  }
`;
