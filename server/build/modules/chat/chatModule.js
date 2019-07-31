"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@graphql-modules/core");

var _apolloServerExpress = require("apollo-server-express");

var _scalars = _interopRequireDefault(require("../scalars"));

var _common = _interopRequireDefault(require("../common"));

var _auth = _interopRequireDefault(require("../auth"));

var _user = _interopRequireDefault(require("../user"));

var _ChatProvider = _interopRequireDefault(require("./ChatProvider"));

var _chatResolvers = _interopRequireDefault(require("./chatResolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

// import { isAuth } from '../middlewares';
const ChatModule = new _core.GraphQLModule({
  name: 'chat',
  imports: [_scalars.default, _common.default, _auth.default, _user.default],
  providers: [_ChatProvider.default],
  typeDefs: _apolloServerExpress.gql`
    enum ChatMessageType {
      system
      text
    }

    type ChatMessage {
      id: ID!
      senderId: ID
      type: ChatMessageType!
      content: String!
      time: DateTime!
      edited: Boolean!
      seen: Boolean!
    }

    type Chat {
      id: ID!
      members: [ID!]!
      createdBy: ID!
      createDate: DateTime!
      messages: [ChatMessage]
    }

    type ContactUpdate {
      contact: MyContact!
      chat: Chat!
    }

    type MessageUpdate {
      chatId: ID!
      optimistic: Boolean!
      optimisticId: String!
      message: ChatMessage!
    }

    type Query {
      chats: [Chat!]!
      myChats: [Chat!]!
      chatMessages(chatId: String!, skip: Int!): [ChatMessage!]!
    }

    type Mutation {
      createChat(userId: ID!): ContactUpdate!
      addMessage(chatId: String!, content: String!, time: DateTime!, optimisticId: String!): MessageUpdate!
      removeChat(id: ID!): Boolean!
      removeChats: Boolean!
    }

    type Subscription {
      chatCreated: ContactUpdate!
      messageAdded: MessageUpdate!
    }
  `,
  resolvers: _chatResolvers.default,
  resolversComposition: {}
});
const _default = ChatModule;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ChatModule, "ChatModule", "E:\\Projects\\graphichat\\server\\src\\modules\\chat\\chatModule.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\chat\\chatModule.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();