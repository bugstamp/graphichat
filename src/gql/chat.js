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
  query ChatMessages($chatId: String!, $skip: Int!) {
    chatMessages(chatId: $chatId, skip: $skip) {
      ...messageData
    }
  }
  ${messageFragment}
`;

export const ADD_MESSAGE = gql`
  mutation AddMessage($chatId: String!, $content: String!, $time: DateTime!, $optimisticId: String!) {
    addMessage(chatId: $chatId, content: $content, time: $time, optimisticId: $optimisticId) {
      chatId
      optimistic
      optimisticId
      message {
        ...messageData
      }
    }
  }
  ${messageFragment}
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messageAdded {
      chatId
      optimisticId
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
