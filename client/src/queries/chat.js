import { concat } from 'lodash';

import gql from '../gql';
import { createMutation, createQuery, createSubscription } from '../apollo/utils';

const {
  GET_MY_CHATS,
  CHAT_CREATED_SUBSCRIPTION,
} = gql;

export const chatCreatedUpdate = (client, { contact, chat }) => {
  const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });

  client.writeQuery({
    query: GET_MY_CHATS,
    data: {
      myContacts: concat(myContacts, contact),
      myChats: concat(myChats, chat),
    },
  });
};

const chatCreatedSubscription = createSubscription('chatCreatedSubscription', CHAT_CREATED_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData: { data: { chatCreated } } }) {
    chatCreatedUpdate(client, chatCreated);
  },
});

export {
  chatCreatedSubscription,
};
