import gql from 'graphql-tag';

export const authPayloadFragment = gql`
  fragment tokens on AuthPayload {
    token
    refreshToken
  }
`;

export const myFragment = gql`
  fragment myData on User {
    id
    username
    displayName
    firstName
    lastName
    status
  }
`;

export const myContactFragment = gql`
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

export const myChatFragment = gql`
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
