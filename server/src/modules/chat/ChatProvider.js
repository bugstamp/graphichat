import { map, isEmpty } from 'lodash';
import { Injectable, Inject } from '@graphql-modules/di';
import { PubSub } from 'apollo-server-express';

import DbProvider from '../common/DbProvider';
import AuthProvider from '../auth/AuthProvider';

import { CHAT_CREATED } from '../subscriptions';

@Injectable()
class ChatProvider {
  @Inject(AuthProvider)
  authProvider;

  db = DbProvider.db;

  pubsub = PubSub

  getChats = async () => {
    try {
      const chats = await this.db.Chat.find({});

      return chats;
    } catch (e) {
      throw e;
    }
  }

  getMyChats = async () => {
    try {
      const { contacts } = this.authProvider.getMe();
      const myChats = [];

      if (!isEmpty(contacts)) {
        return await map(contacts, async ({ chatId }) => {
          const chat = await this.db.Chat.findById(chatId, {
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
  }

  createChat = async (userId) => {
    try {
      const { id, displayName } = await this.authProvider.getMe();
      const contact = await this.db.User.findById(userId);
      const chat = await this.db.Chat.create({
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

      await this.db.User.findByIdAndUpdate(id, { $push: { contacts: { userId, chatId } } });
      await this.db.User.findByIdAndUpdate(userId, { $push: { contacts: { userId, chatId } } });

      const result = {
        contact: {
          chatId,
          userInfo: contact,
        },
        chat,
      };

      await this.pubsub.publish(CHAT_CREATED, { chatCreated: result });

      return result;
    } catch (e) {
      throw e;
    }
  }

  removeChat = async (chatId) => {
    try {
      await this.db.Chat.findByIdAndDelete(chatId);

      return true;
    } catch (e) {
      throw e;
    }
  }

  removeChats = async () => {
    try {
      await this.db.Chat.remove();

      return true;
    } catch (e) {
      throw e;
    }
  }
}

export default ChatProvider;
