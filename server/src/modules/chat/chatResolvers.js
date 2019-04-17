import { map } from 'lodash';

export default {
  Query: {
    async myChats(parent, args, { db, user: { id } }) {
      try {
        const { friends } = await db.User.findById(id);
        const chatIds = map(friends, 'chatId');
        const myChats = await db.Chat.find({ id: { $in: chatIds } });

        return myChats;
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
