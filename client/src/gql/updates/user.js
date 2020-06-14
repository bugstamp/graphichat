import { find } from 'lodash';

import { GET_ME, GET_MY_CONTACTS } from '../user';
import { myContactActivityFragment } from '../fragments';

export const userContactSubscriptionUpdate = ({ client, subscriptionData: { data: { userUpdated } } }) => {
  const { id: userId } = userUpdated;
  const { myContacts } = client.readQuery({ query: GET_MY_CONTACTS });
  const updatedContacts = myContacts.map((contact) => {
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
};

export const userActivityUpdate = ({ client, subscriptionData: { data: { userActivityUpdated } } }) => {
  const { userId, status, lastDate } = userActivityUpdated;
  const { myContacts } = client.readQuery({ query: GET_MY_CONTACTS });
  const contact = find(myContacts, ({ userInfo: { id: userId } }));

  if (contact) {
    const { id: contactId } = contact;
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
  }
};

export const uploadAvatarUpdate = (client, { data: { uploadAvatar: avatar } }) => {
  const { me } = client.readQuery({ query: GET_ME });

  client.writeQuery({
    query: GET_ME,
    data: { me: { ...me, avatar } },
  });
};

export const userUpdate = (client, { data: { updateUser: { field, value } } }) => {
  const { me } = client.readQuery({ query: GET_ME });

  client.writeQuery({
    query: GET_ME,
    data: { me: { ...me, [field]: value } },
  });
};
