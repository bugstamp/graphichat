import { ObjectId } from 'mongodb';

import mongoose from '../mongoose';

const messageTypeEnums = ['system', 'text'];
const maxMessageCount = 20;

const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    enum: messageTypeEnums,
    default: 'text',
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    default: new Date(),
    require: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  members: [String],
  createdBy: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  messages: [chatMessageSchema],
});

chatSchema.methods = {
  async addMessage(senderId, content, time) {
    try {
      const newMessageTemplate = {
        senderId,
        content,
        time,
      };
      const newMessage = this.messages.create(newMessageTemplate);
      this.messages.push(newMessage);
      await this.save();

      return newMessage;
    } catch (e) {
      throw e;
    }
  },
};

chatSchema.statics = {
  async createChat(id, userId, createdBy, createDate = null) {
    try {
      const firstMessageTemplate = {
        type: 'system',
        content: `Chat created by ${createdBy}`,
        time: createDate,
      };
      const chat = await this.create({
        createdBy: id,
        members: [id, userId],
        messages: [firstMessageTemplate],
        createDate,
      });

      return chat;
    } catch (e) {
      throw e;
    }
  },
  async getChatWithLastMessage(chatId) {
    try {
      const chat = await this.findById(chatId, {
        messages: { $slice: -1 },
      });

      return chat;
    } catch (e) {
      throw e;
    }
  },
  async messagePagination(chatId, skip) {
    try {
      const messages = await this.aggregate([
        { $match: { _id: ObjectId(chatId) } },
        { $unwind: '$messages' },
        { $sort: { 'messages.time': -1 } },
        { $skip: skip },
        { $limit: maxMessageCount },
        {
          $group: {
            _id: '$messages._id',
            id: { $first: '$messages._id' },
            senderId: { $first: '$messages.senderId' },
            type: { $first: '$messages.type' },
            content: { $first: '$messages.content' },
            time: { $first: '$messages.time' },
            seen: { $first: '$messages.seen' },
            edited: { $first: '$messages.edited' },
          },
        },
        { $sort: { time: 1 } },
      ]);

      return messages;
    } catch (e) {
      throw e;
    }
  },
};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
