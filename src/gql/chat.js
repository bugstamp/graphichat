import gql from 'graphql-tag';

import { myContactFragment, myChatFragment } from './fragments';

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

export const CHAT_CREATED_SUBSCRIPTION = gql`
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

export default {
  CREATE_CHAT,
  CHAT_CREATED_SUBSCRIPTION,
};
