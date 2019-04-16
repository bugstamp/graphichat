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
  editTime: Date,
  ownerId: {
    type: ObjectId,
    require: true,
  },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    require: true,
  },
  messages: [messageSchema],
});

chatSchema.methods = {};
chatSchema.statistics = {};

const Chat = mongoose.model('User', chatSchema);

export default Chat;
