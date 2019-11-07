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
    avatar {
      sm
      md
    }
    username
    displayName
    firstName
    lastName
    status
    password
  }
`;

export const userInfoFragment = gql`
  fragment userInfoData on User {
    id
    avatar {
      sm
      md
    }
    username
    displayName
    firstName
    lastName
    status
    lastDate
  }
`;

export const myContactFragment = gql`
  fragment myContactData on MyContact {
    id
    chatId
    userInfo {
      ...userInfoData
    }
  }
  ${userInfoFragment}
`;

export const messageFragment = gql`
  fragment messageData on ChatMessage {
    id
    senderId
    type
    content
    time
    edited
    seen
  }
`;

export const myChatFragment = gql`
  fragment myChatData on Chat {
    id
    messages {
      ...messageData
    }
  }
  ${messageFragment}
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
