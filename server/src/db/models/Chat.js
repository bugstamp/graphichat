// import {} from 'lodash';

import mongoose from '../mongoose';

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    require: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  ownerId: {
    type: ObjectId,
    require: true,
  },
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
});

const chatSchema = new mongoose.Schema({
  ownerId: {
    type: ObjectId,
    require: true,
  },
  userId: {
    type: ObjectId,
    require: true,
  },
  profile: profileSchema,
  createDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  lastDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  messages: [messageSchema],
});

chatSchema.methods = {};
chatSchema.statistics = {};

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
