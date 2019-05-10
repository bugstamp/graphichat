import AuthProvider from '../auth/AuthProvider';
import UserProvider from './UserProvider';

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
};
