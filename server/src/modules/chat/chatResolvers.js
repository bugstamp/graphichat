import { PubSub, withFilter } from 'apollo-server-express';

import ChatProvider from './ChatProvider';

import { CHAT_CREATED } from '../subscriptions';

export default {
  Query: {
    chats: (parent, args, { injector }) => injector.get(ChatProvider).getChat(),
    myChats: (parent, args, { injector }) => injector.get(ChatProvider).getMyChats(),
  },
  Mutation: {
    createChat: (parent, { userId }, { injector }) => injector.get(ChatProvider).createChat(userId),
    removeChat: (parent, { chatId }, { injector }) => injector.get(ChatProvider).removeChat(chatId),
    removeChats: (parent, args, { injector }) => injector.get(ChatProvider).removeChats(),
  },
  Subscription: {
    chatCreated: {
      subscribe: (parent, args, { injector }) => {
        return injector.get(PubSub).asyncIterator([CHAT_CREATED]);
      },
    },
  },
};
