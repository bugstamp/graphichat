"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _mongoose = _interopRequireDefault(require("../mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const messageTypeEnums = ['system', 'text'];
const maxMessageCount = 20;
const chatMessageSchema = new _mongoose.default.Schema({
  senderId: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: messageTypeEnums,
    default: 'text',
    require: true
  },
  content: {
    type: String,
    require: true
  },
  time: {
    type: Date,
    default: new Date(),
    require: true
  },
  edited: {
    type: Boolean,
    default: false
  },
  seen: {
    type: Boolean,
    default: false
  }
});
const chatSchema = new _mongoose.default.Schema({
  members: [String],
  createdBy: {
    type: String,
    require: true
  },
  createDate: {
    type: Date,
    require: true,
    default: new Date()
  },
  messages: [chatMessageSchema]
});
chatSchema.methods = {
  async addMessage(senderId, content, time) {
    try {
      const newMessageTemplate = {
        senderId,
        content,
        time
      };
      const newMessage = this.messages.create(newMessageTemplate);
      this.messages.push(newMessage);
      await this.save();
      return newMessage;
    } catch (e) {
      throw e;
    }
  }

};
chatSchema.statics = {
  async createChat(id, userId, createdBy) {
    try {
      const firstMessageTemplate = {
        type: 'system',
        content: `Chat created by ${createdBy}`
      };
      const chat = await this.create({
        createdBy: id,
        members: [id, userId],
        messages: [firstMessageTemplate]
      });
      return chat;
    } catch (e) {
      throw e;
    }
  },

  async getChatWithLastMessage(chatId) {
    try {
      const chat = await this.findById(chatId, {
        messages: {
          $slice: -1
        }
      });
      return chat;
    } catch (e) {
      throw e;
    }
  },

  async messagePagination(chatId, skip) {
    try {
      const messages = await this.aggregate([{
        $match: {
          _id: (0, _mongodb.ObjectId)(chatId)
        }
      }, {
        $unwind: '$messages'
      }, {
        $sort: {
          'messages.time': -1
        }
      }, {
        $skip: skip
      }, {
        $limit: maxMessageCount
      }, {
        $group: {
          _id: '$messages._id',
          id: {
            $first: '$messages._id'
          },
          senderId: {
            $first: '$messages.senderId'
          },
          type: {
            $first: '$messages.type'
          },
          content: {
            $first: '$messages.content'
          },
          time: {
            $first: '$messages.time'
          },
          seen: {
            $first: '$messages.seen'
          },
          edited: {
            $first: '$messages.edited'
          }
        }
      }, {
        $sort: {
          time: 1
        }
      }]);
      return messages;
    } catch (e) {
      throw e;
    }
  }

};

const Chat = _mongoose.default.model('Chat', chatSchema);

const _default = Chat;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(messageTypeEnums, "messageTypeEnums", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
  reactHotLoader.register(maxMessageCount, "maxMessageCount", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
  reactHotLoader.register(chatMessageSchema, "chatMessageSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
  reactHotLoader.register(chatSchema, "chatSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
  reactHotLoader.register(Chat, "Chat", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\db\\models\\Chat.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();