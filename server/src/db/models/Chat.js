// import {} from 'lodash';

import mongoose from '../mongoose';

const messageTypeEnums = ['system', 'text'];

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

chatSchema.methods = {};
chatSchema.statistics = {};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
