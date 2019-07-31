"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _AuthProvider = _interopRequireDefault(require("../auth/AuthProvider"));

var _ChatProvider = _interopRequireDefault(require("./ChatProvider"));

var _subscriptions = require("../subscriptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const _default = {
  Query: {
    chats: (_, args, {
      injector
    }) => injector.get(_ChatProvider.default).getChats(),
    myChats: (_, args, {
      injector
    }) => injector.get(_ChatProvider.default).getMyChats(),
    chatMessages: (_, {
      chatId,
      skip
    }, {
      injector
    }) => injector.get(_ChatProvider.default).getChatMessages(chatId, skip)
  },
  Mutation: {
    createChat: (_, {
      userId
    }, {
      injector
    }) => injector.get(_ChatProvider.default).createChat(userId),
    addMessage: (_, args, {
      injector
    }) => injector.get(_ChatProvider.default).addMessage(args),
    removeChat: (_, {
      chatId
    }, {
      injector
    }) => injector.get(_ChatProvider.default).removeChat(chatId),
    removeChats: (_, args, {
      injector
    }) => injector.get(_ChatProvider.default).removeChats()
  },
  Subscription: {
    chatCreated: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, args, {
        injector
      }) => injector.get(_graphqlSubscriptions.PubSub).asyncIterator([_subscriptions.CHAT_CREATED]), ({
        chatCreated
      }, variables, {
        injector
      }) => {
        const {
          chat: {
            members
          },
          contact: {
            userInfo
          }
        } = chatCreated;
        const {
          id
        } = injector.get(_AuthProvider.default).user;
        const accept = (0, _includes2.default)(members, id) && userInfo.id !== id;
        return accept;
      })
    },
    messageAdded: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, args, {
        injector
      }) => injector.get(_graphqlSubscriptions.PubSub).asyncIterator([_subscriptions.MESSAGE_ADDED]), async ({
        messageAdded
      }, variables, {
        injector
      }) => {
        const {
          chatId,
          message: {
            senderId
          }
        } = messageAdded;
        const {
          id,
          contacts
        } = await injector.get(_AuthProvider.default).getMe();
        const accept = (0, _find2.default)(contacts, {
          chatId
        }) && senderId !== id;
        return accept;
      })
    }
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\chat\\chatResolvers.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();