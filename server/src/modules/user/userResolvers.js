import { map } from 'lodash';

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
        const contactIds = map(contacts, 'userId');
        const myContacts = await db.User.find({ id: { $in: contactIds } });

        return myContacts;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    async delete(parent, { id }, { db }) {
      try {
        const result = db.User.findByIdAndDelete(id);

        return result;
      } catch (e) {
        throw e;
      }
    },
  },
};
