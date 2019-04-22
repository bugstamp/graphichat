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
  Mutation: {
    async removeChat(parent, { id }, { db }) {
      try {
        await db.Chat.findByIdAndDelete(id);

        return true;
      } catch (e) {
        throw e;
      }
    },
  },
};
