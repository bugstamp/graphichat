import { adopt } from 'react-adopt';
import { map } from 'lodash';

import { createQuery, createMutation, createSubscription } from '../../apollo/utils';
import gql from '../../gql';
// import { icqBeepPlay } from '../../helpers';

const {
  GET_MY_CHATS,
  ADD_MESSAGE,
  MESSAGE_ADDED_SUBSCRIPTION,
} = gql;

const addMessageUpdate = (client, { chatId, message }) => {
  const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });
  const updatedMyChats = map(myChats, (chat) => {
    const { id } = chat;

    if (id === chatId) {
      chat.messages.push(message);
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

const getMyChats = createQuery('getMyChats', GET_MY_CHATS, {
  notifyOnNetworkStatusChange: true,
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
  getMyChats,
  addMessage,
  messageAddedSubscription,
});

export default ContactsContainer;
