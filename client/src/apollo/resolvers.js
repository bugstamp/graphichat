import gql from '../gql';

const { GET_MY_CHATS } = gql;

const resolvers = {
  Mutation: {
    selectChat: (_root, variables, { cache }) => {
      const { chatId } = variables;
      const { myChats } = cache.readQuery({ query: GET_MY_CHATS });
      const chat = myChats.find(c => c.id === chatId);

      if (chat) {
        cache.writeData({ data: { selectedChat: chat } });
        return chat;
      }
      return null;
    },
  },
};

export default resolvers;
