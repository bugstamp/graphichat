import { map, isEmpty, filter } from 'lodash';

import AuthProvider from '../auth/authProvider';
import { getUserDisplayName } from '../../utils/helpers';

export default {
  Query: {
    async user(parent, { id }, { db }) {
      try {
        const user = db.User.findById(id);

        return user;
      } catch (e) {
        throw e;
      }
    },
    async users(parent, args, { db }) {
      try {
        const users = await db.User.find({});

        return users;
      } catch (e) {
        throw e;
      }
    },
    async me(parent, args, { db, user: { id } }) {
      try {
        const me = await db.User.findById(id);

        return me;
      } catch (e) {
        throw e;
      }
    },
    async myContacts(parent, args, { db, user: { id } }) {
      try {
        const { contacts } = await db.User.findById(id);
        const myContacts = [];

        if (!isEmpty(contacts)) {
          return await map(contacts, async ({ userId, chatId }) => {
            const contact = await db.User.findById(userId);

            return {
              chatId,
              userInfo: contact,
            };
          });
        }
        return myContacts;
      } catch (e) {
        throw e;
      }
    },
    async searchUsers(parent, { searchValue }, { db, user: { id } }) {
      try {
        let usersList = [];

        if (searchValue) {
          const isSearchByUsername = searchValue[0] === '@';

          if (isSearchByUsername) {
            const username = searchValue.slice(1);

            usersList = await db.User.find({ username: { $regex: username, $options: 'i' } });
          } else {
            usersList = await db.User.find({ displayName: { $regex: searchValue, $options: 'i' } });
          }
        }
        return filter(usersList, user => user.id !== id);
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    async createUser(parent, { form }, { db }) {
      try {
        const displayName = getUserDisplayName(form);
        const newUser = await db.User.create({ ...form, displayName });

        return newUser;
      } catch (e) {
        throw e;
      }
    },
    async deleteUser(parent, { id }, { db }) {
      try {
        const result = await db.User.findByIdAndDelete(id);

        return result;
      } catch (e) {
        throw e;
      }
    },
    async removeContacts(parent, { userId }, { db }) {
      try {
        const user = await db.User.findByIdAndUpdate(userId, { contacts: [] }, { new: true });

        return user;
      } catch (e) {
        throw e;
      }
    },
  },
};
