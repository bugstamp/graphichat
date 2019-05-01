// import {} from 'lodash';

import mongoose from '../mongoose';

const { ObjectId } = mongoose.Schema.Types;

const messageTypeEnums = ['system', 'text'];

const chatMessageSchema = new mongoose.Schema({
  senderId: {
    type: ObjectId,
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

const chatHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: new Date(),
  },
  messages: [chatMessageSchema],
});

const chatSchema = new mongoose.Schema({
  members: [ObjectId],
  createdBy: {
    type: ObjectId,
    require: true,
  },
  createDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  history: [chatHistorySchema],
});

chatSchema.methods = {};
chatSchema.statistics = {};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
