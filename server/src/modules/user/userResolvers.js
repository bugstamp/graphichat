import { PubSub, withFilter } from 'apollo-server-express';
import { find } from 'lodash';

import AuthProvider from '../auth/AuthProvider';
import UserProvider from './UserProvider';

import { USER_ACTIVITY_UPDATE } from '../subscriptions';

export default {
  Query: {
    user: (parent, args, { injector }) => injector.get(UserProvider).getUser(),
    users: (parent, args, { injector }) => injector.get(UserProvider).getUsers(),
    me: (parent, args, { injector }) => injector.get(AuthProvider).getMe(),
    myContacts: (parent, args, { injector }) => injector.get(UserProvider).getMyContacts(),
    searchUsers: (parent, { searchValue }, { injector }) => injector.get(UserProvider).searchUsers(searchValue),
  },
  Mutation: {
    createUser: (parent, { form }, { injector }) => injector.get(UserProvider).createUser(form),
    deleteUser: (parent, { id }, { injector }) => injector.get(UserProvider).deleteUser(id),
    removeUserContacts: (parent, { userId }, { injector }) => injector.get(UserProvider).removeUserContacts(userId),
  },
  Subscription: {
    userActivityUpdate: {
      subscribe: withFilter(
        (parent, args, { injector }) => injector.get(PubSub).asyncIterator([USER_ACTIVITY_UPDATE]),
        async ({ userActivityUpdate }, variables, { injector }) => {
          const { userId } = userActivityUpdate;
          const { contacts } = await injector.get(AuthProvider).getMe();

          return find(contacts, { userId });
        },
      ),
    },
  },
};
