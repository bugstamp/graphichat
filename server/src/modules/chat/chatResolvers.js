import { PubSub, withFilter } from 'apollo-server-express';
import { includes } from 'lodash';

import AuthProvider from '../auth/AuthProvider';
import ChatProvider from './ChatProvider';

import { CHAT_CREATED } from '../subscriptions';

export default {
  Query: {
    chats: (parent, args, { injector }) => injector.get(ChatProvider).getChats(),
    myChats: (parent, args, { injector }) => injector.get(ChatProvider).getMyChats(),
  },
  Mutation: {
    createChat: (parent, { userId }, { injector }) => injector.get(ChatProvider).createChat(userId),
    removeChat: (parent, { chatId }, { injector }) => injector.get(ChatProvider).removeChat(chatId),
    removeChats: (parent, args, { injector }) => injector.get(ChatProvider).removeChats(),
  },
  Subscription: {
    chatCreated: {
      subscribe: withFilter(
        (parent, args, { injector }) => injector.get(PubSub).asyncIterator([CHAT_CREATED]),
        ({ chatCreated }, variables, { injector }) => {
          const { chat: { members }, contact: { userInfo } } = chatCreated;
          const { id } = injector.get(AuthProvider).user;
          const accept = includes(members, id) && userInfo.id !== id;

          return accept;
        },
      ),
    },
  },
};
