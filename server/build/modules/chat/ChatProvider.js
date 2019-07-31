"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _di = require("@graphql-modules/di");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _DbProvider = _interopRequireDefault(require("../common/DbProvider"));

var _AuthProvider = _interopRequireDefault(require("../auth/AuthProvider"));

var _subscriptions = require("../subscriptions");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

let ChatProvider = (_dec = (0, _di.Injectable)({
  scope: _di.ProviderScope.Session
}), _dec2 = (0, _di.Inject)(_AuthProvider.default), _dec3 = (0, _di.Inject)(_graphqlSubscriptions.PubSub), _dec(_class = (_class2 = (_temp = class ChatProvider {
  constructor() {
    _initializerDefineProperty(this, "authProvider", _descriptor, this);

    _initializerDefineProperty(this, "pubsub", _descriptor2, this);

    this.db = _DbProvider.default.db;

    this.getChats = async () => {
      try {
        const chats = await this.db.Chat.find({});
        return chats;
      } catch (e) {
        throw e;
      }
    };

    this.getMyChats = async () => {
      try {
        const {
          contacts
        } = await this.authProvider.getMe();
        const myChats = [];

        if (!(0, _isEmpty2.default)(contacts)) {
          return await (0, _map2.default)(contacts, async ({
            chatId
          }) => {
            const chat = await this.db.Chat.getChatWithLastMessage(chatId);
            return chat;
          });
        }

        return myChats;
      } catch (e) {
        throw e;
      }
    };

    this.getChatMessages = async (chatId, skip) => {
      try {
        const messages = await this.db.Chat.messagePagination(chatId, skip);
        return messages;
      } catch (e) {
        throw e;
      }
    };

    this.createChat = async userId => {
      try {
        const me = await this.authProvider.getMe();
        const {
          id,
          displayName
        } = me;
        const contact = await this.db.User.findById(userId);
        const chat = await this.db.Chat.createChat(id, userId, displayName);
        const {
          id: chatId
        } = chat;
        const {
          id: myContactId
        } = await this.db.User.addContact(id, userId, chatId);
        const {
          id: contactId
        } = await this.db.User.addContact(userId, id, chatId);
        const myResult = {
          contact: {
            id: myContactId,
            chatId,
            userInfo: contact
          },
          chat
        };
        const contactResult = {
          contact: {
            id: contactId,
            chatId,
            userInfo: me
          },
          chat
        };
        await this.pubsub.publish(_subscriptions.CHAT_CREATED, {
          chatCreated: contactResult
        });
        return myResult;
      } catch (e) {
        throw e;
      }
    };

    this.addMessage = async ({
      chatId,
      content,
      time,
      optimisticId
    }) => {
      try {
        const {
          id
        } = this.authProvider.user;
        const chat = await this.db.Chat.findById(chatId);
        const newMessage = await chat.addMessage(id, content, time);
        const result = {
          chatId,
          optimistic: false,
          optimisticId,
          message: newMessage
        };
        await this.pubsub.publish(_subscriptions.MESSAGE_ADDED, {
          messageAdded: result
        });
        return result;
      } catch (e) {
        throw e;
      }
    };

    this.removeChat = async chatId => {
      try {
        await this.db.Chat.findByIdAndDelete(chatId);
        return true;
      } catch (e) {
        throw e;
      }
    };

    this.removeChats = async () => {
      try {
        await this.db.Chat.remove();
        return true;
      } catch (e) {
        throw e;
      }
    };
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "authProvider", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pubsub", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
const _default = ChatProvider;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChatProvider, "ChatProvider", "E:\\Projects\\graphichat\\server\\src\\modules\\chat\\ChatProvider.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\chat\\ChatProvider.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();