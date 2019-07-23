import { find } from 'lodash';

import gql from '../gql';

const { GET_MY_CHATS, GET_SELECTED_CHAT } = gql;

const resolvers = {
  Mutation: {
    selectChat: (_, { chatId }, { cache }) => {
      const { myContacts, myChats } = cache.readQuery({ query: GET_MY_CHATS });
      const contact = find(myContacts, { chatId });
      const chat = find(myChats, { id: chatId });

      cache.writeData({
        data: {
          selectedChat: {
            contact,
            chat,
            __typename: 'selectedChat',
          },
        },
      });
    },
  },
  Query: {
    selectedChat: (_, { chatId }, { cache }) => {
      // const { contact, chat } = cache.readQuery({ query: GET_SELECTED_CHAT });
      const { myContacts, myChats } = cache.readQuery({ query: GET_MY_CHATS });
      const contact = find(myContacts, { chatId });
      const chat = find(myChats, { id: chatId });

      return { contact, chat, __typename: 'SelectedChat' };
    },
  },
};

export default resolvers;
