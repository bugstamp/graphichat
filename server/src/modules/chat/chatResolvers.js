import { map, isEmpty } from 'lodash';
import { PubSub, withFilter } from 'apollo-server-express';

import AuthProvider from '../auth/authProvider';

const CHAT_CREATED = 'CHAT_CREATED';

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
    async myChats(parent, args, { db, user: { id } }) {
      try {
        const { contacts } = await db.User.findById(id);
        const myChats = [];

        if (!isEmpty(contacts)) {
          return await map(contacts, async ({ chatId }) => {
            const chat = await db.Chat.findById(chatId, {
              history: {
                $slice: -1,
              },
            });
            return chat;
          });
        }
        return myChats;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    async createChat(parent, { userId }, { db, user: { id }, injector }) {
      try {
        const { displayName } = await db.User.findById(id);
        const contact = await db.User.findById(userId);
        const chat = await db.Chat.create({
          createdBy: id,
          members: [id, userId],
          history: [
            {
              date: Date.now(),
              messages: [
                {
                  type: 'system',
                  content: `Chat created by ${displayName}`,
                },
              ],
            },
          ],
        });
        const { id: chatId } = chat;

        await db.User.findByIdAndUpdate(id, { $push: { contacts: { userId, chatId } } });
        await db.User.findByIdAndUpdate(userId, { $push: { contacts: { userId, chatId } } });

        const result = {
          contact: {
            chatId,
            userInfo: contact,
          },
          chat,
        };

        await injector.get(PubSub).publish(CHAT_CREATED, { chatCreated: result });

        return result;
      } catch (e) {
        throw e;
      }
    },
    async removeChat(parent, { chatId }, { db }) {
      try {
        await db.Chat.findByIdAndDelete(chatId);

        return true;
      } catch (e) {
        throw e;
      }
    },
    async removeChats(parent, args, { db }) {
      try {
        await db.Chat.remove();

        return true;
      } catch (e) {
        throw e;
      }
    },
  },
  Subscription: {
    chatCreated: {
      subscribe: (parent, args, { injector }) => {
        return injector.get(PubSub).asyncIterator([CHAT_CREATED]);
      },
    },
  },
};
