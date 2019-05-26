import { adopt } from 'react-adopt';

import { createQuery, createMutation } from '../../apollo/utils';
import gql from '../../gql';

const {
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
} = gql;

const getChatMessages = createQuery('getChatMessages', GET_CHAT_MESSAGES);
const addMessage = createMutation('addMessage', ADD_MESSAGE);

const MessagePanelContainer = adopt({
  getChatMessages,
  addMessage,
});

export default MessagePanelContainer;
