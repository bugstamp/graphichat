import { forEach, isEmpty, filter } from 'lodash';
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
          forEach(contacts, async ({ userId, chatId }) => {
            const person = await db.User.findById(userId);
            const messages = await db.Chat
              .find({ id: chatId }, {
                messages: {
                  $slice: ['$messages', -1],
                },
              });

            myContacts.push({
              person,
              messages,
            });
          });
        }

        return myContacts;
      } catch (e) {
        throw e;
      }
    },
    async searchUsers(parent, { searchValue }, { db }) {
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

        return usersList;
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
        const result = db.User.findByIdAndDelete(id);

        return result;
      } catch (e) {
        throw e;
      }
    },
    async addContact(parent, { userId }, { db, user: { id } }) {
      try {
        const person = await db.User.findById(userId);
        const { id: chatId, messages } = await db.Chat.create({});
        await db.User.findByIdAndUpdate(id, { $push: { contacts: { userId, chatId } } });

        return {
          person,
          messages,
        };
      } catch (e) {
        throw e;
      }
    },
    async removeContact(parent, { userId }, { db, user: { id } }) {
      try {
        const user = await db.User.findById(id);
        const { contacts } = user;
        await user.update({ contacts: filter(contacts, contact => contact.userId !== userId) });

        return true;
      } catch (e) {
        throw e;
      }
    },
  },
};
