export default {
  Query: {
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
