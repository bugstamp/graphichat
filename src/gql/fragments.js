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
    id
    chatId
    userInfo {
      id
      username
      displayName
      firstName
      lastName
      status
      lastDate
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

export const myContactActivityFragment = gql`
  fragment contactActivity on MyContact {
    userInfo {
      id
      status
      lastDate
    }
  }
`;
