import { map } from 'lodash';

export default {
  Query: {
    async myChats(parent, args, { db, user }) {
      try {
        const { id } = user;
        const { friends } = db.User.findById(id);
        const chatIds = map(friends, 'chatId');
        const chats = db.Chat.find({ id: { $in: chatIds } });

        return chats;
      } catch (e) {
        throw e;
      }
    },
    async chats(parent, args, { db }) {
      try {
        const chats = db.Chat.find({});

        return chats;
      } catch (e) {
        throw e;
      }
    },
  },
};
