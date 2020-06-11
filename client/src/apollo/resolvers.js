import { find } from 'lodash';

import gql from '../gql';

const { GET_MY_CHATS } = gql;

const resolvers = {
  Query: {
    contact(__root, variables, { cache }) {
      const { chatId } = variables;
      const { myContacts } = cache.readQuery({ query: GET_MY_CHATS });

      return find(myContacts, { chatId });
    },
    // chat(__root, variables, { cache }) {
    //   const { chatId } = variables;
    //   const { myChats } = cache.readQuery({ query: GET_MY_CHATS });
    //
    //   return find(myChats, { id: chatId });
    // },
  },
};

export default resolvers;
