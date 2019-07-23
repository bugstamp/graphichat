import { find } from 'lodash';

import gql from '../gql';

const { GET_MY_CHATS } = gql;

const resolvers = {
  Mutation: {
    selectChat: (_, { chatId }, { cache }) => {
      const { myContacts, myChats } = cache.readQuery({ query: GET_MY_CHATS });
      const contact = find(myContacts, { chatId }) || { __typename: 'MyContact' };
      const chat = find(myChats, { id: chatId }) || { __typename: 'Chat' };

      cache.writeData({
        data: {
          selectedChat: {
            contact,
            chat,
            __typename: 'SelectedChat',
          },
        },
      });
    },
  },
};

export default resolvers;
