import { adopt } from 'react-adopt';
import { map, isEqual } from 'lodash';

import { createQuery, createMutation, createSubscription } from '../../apollo/utils';
import gql from '../../gql';
// import { icqBeepPlay } from '../../helpers';

const {
  GET_ME,
  GET_MY_CHATS,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
  MESSAGE_ADDED_SUBSCRIPTION,
} = gql;

export const fetchMoreMessagesUpdate = variables => ({
  query: GET_CHAT_MESSAGES,
  variables,
  updateQuery(prev, { fetchMoreResult }) {
    const { chatId } = variables;
    const { myChats } = prev;
    const { chatMessages } = fetchMoreResult;
    const updatedChats = map(myChats, (chat) => {
      const { id, messages } = chat;

      if (isEqual(id, chatId)) {
        return {
          ...chat,
          messages: [...chatMessages, ...messages],
        };
      }
      return chat;
    });

    return {
      ...prev,
      myChats: updatedChats,
    };
  },
});

export const getOptimisticMessage = ({
  chatId,
  myId,
  optimisticId,
  content,
  time,
}) => ({
  __typename: 'Mutation',
  addMessage: {
    chatId,
    optimistic: true,
    optimisticId,
    message: {
      id: optimisticId,
      senderId: myId,
      content,
      time,
      type: 'text',
      seen: false,
      edited: false,
      __typename: 'ChatMessage',
    },
    __typename: 'MessageUpdate',
  },
});

const addMessageUpdate = (client, { chatId, message }) => {
  const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });
  const updatedMyChats = map(myChats, (chat) => {
    const { id, messages } = chat;

    if (id === chatId) {
      const newMessages = [...messages, message];

      return {
        ...chat,
        messages: newMessages,
      };
    }
    return chat;
  });

  client.writeQuery({
    query: GET_MY_CHATS,
    data: {
      myContacts,
      myChats: updatedMyChats,
    },
  });
};

const getMe = createQuery('getMe', GET_ME);
const getMyChats = createQuery('getMyChats', GET_MY_CHATS, {
  // notifyOnNetworkStatusChange: true,
});
const addMessage = createMutation('addMessage', ADD_MESSAGE, {
  update(client, { data }) {
    addMessageUpdate(client, data.addMessage);
  },
});
const messageAddedSubscription = createSubscription('messageAddedSubscription', MESSAGE_ADDED_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData: { data: { messageAdded } } }) {
    addMessageUpdate(client, messageAdded);
    // icqBeepPlay();
  },
});

const ContactsContainer = adopt({
  getMe,
  getMyChats,
  addMessage,
  messageAddedSubscription,
});

export default ContactsContainer;
