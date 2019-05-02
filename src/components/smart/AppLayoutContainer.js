import { adopt } from 'react-adopt';
import { concat } from 'lodash';

import { createMutation, createQuery, createSubscription } from '../../apollo/utils';
import {
  GET_ME,
  CREATE_CHAT_SUBSCRIPTION,
  SIGN_OUT,
  GET_MY_CHATS,
  GET_SESSION_EXPIRED,
} from '../../actions/authActions';

const getMe = createQuery('getMe', GET_ME);
const getSessionExpired = createQuery('getSessionExpired', GET_SESSION_EXPIRED);
const createChatSubscription = createSubscription('createChatSubscription', CREATE_CHAT_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData }) {
    const { myContacts, myChats } = client.readQuery({ query: GET_MY_CHATS });
    const { contact, chat } = subscriptionData;

    client.writeQuery({
      query: GET_MY_CHATS,
      data: {
        myContacts: concat(myContacts, contact),
        myChats: concat(myChats, chat),
      },
    });
  },
});
const signOut = createMutation('signOut', SIGN_OUT);

const AppLayoutContainer = adopt({
  createChatSubscription,
  getMe,
  getSessionExpired,
  signOut,
});

export default AppLayoutContainer;
