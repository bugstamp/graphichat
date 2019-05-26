import gql from 'graphql-tag';

import { myContactFragment, myChatFragment, messageFragment } from './fragments';

export const CREATE_CHAT = gql`
  mutation CreateChat($userId: ID!) {
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


export const GET_CHAT_MESSAGES = gql`
  query ChatMessages($chatId: String!, $lastMessageTime: DateTime!) {
    chatMessages(chatId: $chatId, lastMessageTime: $lastMessageTime) {
      ...messageData
    }
  }
  ${messageFragment}
`;

export const ADD_MESSAGE = gql`
  mutation AddMessage($chatId: String!, $content: String!) {
    addMessages(chatId: $chatId, content: $content) {
      chatId
      message {
        ...messageData
      }
    }
  }
  ${messageFragment}
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded($chatId: String) {
    messageAdded(chatId: $chatId) {
      chatId
      message {
        ...messageData
      }
    }
  }
  ${messageFragment}
`;

export default {
  CREATE_CHAT,
  CHAT_CREATED_SUBSCRIPTION,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
  MESSAGE_ADDED_SUBSCRIPTION,
};
