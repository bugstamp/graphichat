// import {} from 'lodash';

import mongoose from '../mongoose';

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
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
  editTime: Date,
  edited: {
    type: Boolean,
    default: false,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  members: [ObjectId],
  createDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  lastDate: Date,
  messages: [messageSchema],
});

chatSchema.methods = {};
chatSchema.statistics = {};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
