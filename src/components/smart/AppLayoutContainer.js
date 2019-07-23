import { adopt } from 'react-adopt';
import {
  concat, find, map,
} from 'lodash';

import { createMutation, createQuery, createSubscription } from '../../apollo/utils';
import gql from '../../gql';
import { myContactActivityFragment } from '../../gql/fragments';

// import storage from '../../storage';
// import clientInstance from '../../apollo';
// import history from '../../router/history';

const {
  GET_ME,
  GET_INITIAL_DATA,
  CHAT_CREATED_SUBSCRIPTION,
  SIGN_OUT,
  GET_MY_CHATS,
  GET_MY_CONTACTS,
  CHECK_SESSION_EXPIRATION,
  USER_ACTIVITY_SUBSCRIPTION,
  USER_UPDATE_SUBSCRIPTION,
  UPLOAD_AVATAR,
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

const getInitialData = createQuery('getInitialData', GET_INITIAL_DATA);
const checkSessionExpiration = createQuery('checkSessionExpiration', CHECK_SESSION_EXPIRATION);
const chatCreatedSubscription = createSubscription('chatCreatedSubscription', CHAT_CREATED_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData: { data: { chatCreated } } }) {
    chatCreatedUpdate(client, chatCreated);
  },
});
const userActivitySubscription = createSubscription('userActivitySubscription', USER_ACTIVITY_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData: { data: { userActivityUpdated } } }) {
    const { userId, status, lastDate } = userActivityUpdated;
    const { myContacts } = client.readQuery({ query: GET_MY_CONTACTS });
    const { id: contactId } = find(myContacts, ({ userInfo: { id: userId } }));

    const fragment = myContactActivityFragment;
    const id = `MyContact:${contactId}`;
    const { userInfo, ...rest } = client.readFragment({ fragment, id });

    client.writeFragment({
      fragment,
      id,
      data: {
        userInfo: {
          ...userInfo,
          status,
          lastDate,
        },
        ...rest,
      },
    });
  },
});
const signOut = createMutation('signOut', SIGN_OUT, {
  // onCompleted() {
  //   storage.removeTokens();
  //   clientInstance.resetStore();
  //   history.push('/');
  // },
});
const uploadAvatar = createMutation('uploadAvatar', UPLOAD_AVATAR, {
  update(client, { data: { uploadAvatar: avatar } }) {
    const { me } = client.readQuery({ query: GET_ME });

    client.writeQuery({
      query: GET_ME,
      data: { me: { ...me, avatar } },
    });
  },
});
const userUpdateSubscription = createSubscription('userUpdateSubscription', USER_UPDATE_SUBSCRIPTION, {
  onSubscriptionData({ client, subscriptionData: { data: { userUpdated } } }) {
    const { id: userId } = userUpdated;
    const { myContacts } = client.readQuery({ query: GET_MY_CONTACTS });
    const updatedContacts = map(myContacts, (contact) => {
      const { userInfo: { id } } = contact;

      if (id === userId) {
        return { ...contact, userInfo: userUpdated };
      }
      return contact;
    });

    client.writeQuery({ myContacts: updatedContacts });
  },
});

const AppLayoutContainer = adopt({
  chatCreatedSubscription,
  userActivitySubscription,
  getInitialData,
  checkSessionExpiration,
  signOut,
  uploadAvatar,
  userUpdateSubscription,
});

export default AppLayoutContainer;
