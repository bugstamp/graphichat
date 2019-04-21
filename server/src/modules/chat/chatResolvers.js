export default {
  Query: {
    async chats(parent, args, { db }) {
      try {
        const chats = await db.Chat.find({});

        return chats;
      } catch (e) {
        throw e;
      }
    },
  },
};
