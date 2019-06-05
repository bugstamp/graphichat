import { PubSub, withFilter } from 'graphql-subscriptions';
import { find, isEqual } from 'lodash';

import AuthProvider from '../auth/AuthProvider';
import UserProvider from './UserProvider';

import { USER_ACTIVITY_UPDATED, USER_UPDATED } from '../subscriptions';

export default {
  Query: {
    user: (_, args, { injector }) => injector.get(UserProvider).getUser(),
    users: (_, args, { injector }) => injector.get(UserProvider).getUsers(),
    me: async (_, args, { injector }) => {
      const me = await injector.get(AuthProvider).getMe();
      await injector.get(AuthProvider).logIn(me.id);

      return me;
    },
    myContacts: (_, args, { injector }) => injector.get(UserProvider).getMyContacts(),
    searchUsers: (_, { searchValue }, { injector }) => injector.get(UserProvider).searchUsers(searchValue),
  },
  Mutation: {
    createUser: (_, { form }, { injector }) => injector.get(UserProvider).createUser(form),
    deleteUser: (_, { id }, { injector }) => injector.get(UserProvider).deleteUser(id),
    removeUserContacts: (_, { userId }, { injector }) => injector.get(UserProvider).removeUserContacts(userId),
    uploadAvatar: async (_, { file }, { injector }) => injector.get(UserProvider).uploadAvatar(file),
  },
  Subscription: {
    userActivityUpdated: {
      subscribe: withFilter(
        (_, args, { injector }) => injector.get(PubSub).asyncIterator([USER_ACTIVITY_UPDATED]),
        async ({ userActivityUpdated }, variables, { injector }) => {
          const { userId } = userActivityUpdated;
          const { contacts } = await injector.get(AuthProvider).getMe();

          return !!find(contacts, { userId });
        },
      ),
    },
    userUpdated: {
      subscribe: withFilter(
        (_, args, { injector }) => injector.get(PubSub).asyncIterator([USER_UPDATED]),
        async ({ userUpdated }, variables, { injector }) => {
          const { id: userId } = userUpdated;
          const { id, contacts } = await injector.get(AuthProvider).getMe();

          return (userId !== id) && !!find(contacts, { userId });
        },
      ),
    },
  },
};
