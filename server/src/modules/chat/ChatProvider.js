import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { PubSub } from 'graphql-subscriptions';
import { map, isEmpty } from 'lodash';

import DbProvider from '../common/DbProvider';
import AuthProvider from '../auth/AuthProvider';

import { CHAT_CREATED, MESSAGE_ADDED } from '../subscriptions';

@Injectable({
  scope: ProviderScope.Session,
})
class ChatProvider {
  @Inject(AuthProvider)
  authProvider;

  @Inject(PubSub)
  pubsub;

  db = DbProvider.db;

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
      const { contacts } = await this.authProvider.getMe();
      const myChats = [];

      if (!isEmpty(contacts)) {
        return await map(contacts, async ({ chatId }) => {
          const chat = await this.db.Chat.findById(chatId, {
            messages: {
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
      const me = await this.authProvider.getMe();
      const { id, displayName } = me;
      const contact = await this.db.User.findById(userId);
      const chat = await this.db.Chat.create({
        createdBy: id,
        members: [id, userId],
        messages: [
          {
            type: 'system',
            content: `Chat created by ${displayName}`,
          },
        ],
      });
      const { id: chatId } = chat;
      const { id: myContactId } = await this.db.User.addContact(id, userId, chatId);
      const { id: contactId } = await this.db.User.addContact(userId, id, chatId);

      const myResult = {
        contact: {
          id: myContactId,
          chatId,
          userInfo: contact,
        },
        chat,
      };
      const contactResult = {
        contact: {
          id: contactId,
          chatId,
          userInfo: me,
        },
        chat,
      };

      await this.pubsub.publish(CHAT_CREATED, { chatCreated: myResult });
      await this.pubsub.publish(CHAT_CREATED, { chatCreated: contactResult });

      return myResult;
    } catch (e) {
      throw e;
    }
  }

  addMessage = async ({ chatId, content }) => {
    try {
      const time = new Date();
      const { id: senderId } = this.authProvider.user;
      const newMessage = {
        senderId,
        content,
        time,
      };
      const res = await this.db.Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { messages: newMessage },
        },
        {
          new: true,
          select: {
            messages: {
              $elemMatch: {
                senderId,
                time,
              },
            },
          },
        },
      );
      console.log(res);
      const result = {
        chatId,
        message: res,
      };
      await this.pubsub.publish(MESSAGE_ADDED, { messageAdded: result });

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
