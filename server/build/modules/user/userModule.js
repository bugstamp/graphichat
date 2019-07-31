"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@graphql-modules/core");

var _apolloServerExpress = require("apollo-server-express");

var _scalars = _interopRequireDefault(require("../scalars"));

var _auth = _interopRequireDefault(require("../auth"));

var _UserProvider = _interopRequireDefault(require("./UserProvider"));

var _userResolvers = _interopRequireDefault(require("./userResolvers"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const UserModule = new _core.GraphQLModule({
  name: 'user',
  imports: [_scalars.default, _auth.default],
  providers: [_UserProvider.default],
  typeDefs: _apolloServerExpress.gql`
    enum Status {
      OFFLINE
      ONLINE
    }

    enum regStatus {
      EMAIL_UNCONFIRMED
      UNCOMPLETED
      COMPLETED
    }

    type UserSocials {
      google: ID
      facebook: ID
      github: ID
    }

    type UserContactSettings {
      notifications: Boolean!
    }

    type UserContact {
      id: ID!
      userId: ID!
      chatId: ID!
      settings: UserContactSettings
    }

    type UserAvatar {
      sm: String
      md: String
    }

    type User {
      avatar: UserAvatar
      id: ID!
      username: String
      email: EmailAddress!
      phone: PhoneNumber
      displayName: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: DateTime
      status: Status!
      createDate: DateTime!
      lastDate: DateTime!
      refreshToken: String
      regStatus: regStatus!
      socials: UserSocials!
      contacts: [UserContact!]!
    }

    type MyContact {
      id: ID!
      chatId: ID!
      userInfo: User!
    }

    input UserCreateForm {
      username: String
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      gender: String
      birthday: String
      regStatus: String!
    }

    type UserActivityUpdate {
      userId: ID!
      status: Status!
      lastDate: DateTime!
    }

    type Query {
      user(id: ID!): User
      users: [User!]!
      me: User
      myContacts: [MyContact!]!
      searchUsers(searchValue: String!): [User!]!
    }

    type Mutation {
      createUser(form: UserCreateForm): User!
      deleteUser(id: ID!): User!
      removeUserContacts(userId: ID!): User!
      uploadAvatar(file: Upload!): UserAvatar!
    }

    type Subscription {
      userActivityUpdated: UserActivityUpdate!
      userUpdated: User!
    }
  `,
  resolvers: _userResolvers.default,
  resolversComposition: {
    'Query.me': [(0, _middlewares.isAuth)()],
    'Query.myContacts': [(0, _middlewares.isAuth)()]
  }
});
const _default = UserModule;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserModule, "UserModule", "E:\\Projects\\graphichat\\server\\src\\modules\\user\\userModule.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\user\\userModule.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();