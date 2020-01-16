import { find, map } from 'lodash';

import gql from '../gql';
import { myContactActivityFragment } from '../gql/fragments';
import { createQuery, createMutation, createSubscription } from '../apollo/utils';

const {
  GET_ME,
  GET_INITIAL_DATA,
  GET_MY_CONTACTS,
  UPDATE_USER,
  UPLOAD_AVATAR,
  USER_UPDATE_SUBSCRIPTION,
  USER_ACTIVITY_SUBSCRIPTION,
} = gql;

const getInitialData = createQuery('getInitialData', GET_INITIAL_DATA);

const getMe = createQuery('getMe', GET_ME);

const uploadAvatar = createMutation('uploadAvatar', UPLOAD_AVATAR, {
  update(client, { data: { uploadAvatar: avatar } }) {
    const { me } = client.readQuery({ query: GET_ME });

    client.writeQuery({
      query: GET_ME,
      data: { me: { ...me, avatar } },
    });
  },
});

const updateUser = createMutation('updateUser', UPDATE_USER, {
  update(client, { data: { updateUser: user } }) {
    client.writeQuery({
      query: GET_ME,
      data: { me: { ...user } },
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

    client.writeQuery({
      query: GET_MY_CONTACTS,
      data: { myContacts: updatedContacts },
    });
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

export {
  getInitialData,
  getMe,
  uploadAvatar,
  updateUser,
  userUpdateSubscription,
  userActivitySubscription,
};