import { adopt } from 'react-adopt';

import { createQuery, createMutation, createSubscription } from '../../apollo/utils';
import gql from '../../gql';

const {
  GET_MY_CHATS,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
  MESSAGE_ADDED_SUBSCRIPTION,
} = gql;

const getMyChats = createQuery('getMyChats', GET_MY_CHATS);
const getChatMessages = createQuery('getChatMessages', GET_CHAT_MESSAGES);
const addMessage = createMutation('addMessage', ADD_MESSAGE);
const messageAddedSubscription = createSubscription('messageAddedSubscription', MESSAGE_ADDED_SUBSCRIPTION);

const ContactsContainer = adopt({
  getMyChats,
  getChatMessages,
  addMessage,
  messageAddedSubscription,
});

export default ContactsContainer;
