"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _AuthProvider = _interopRequireDefault(require("../auth/AuthProvider"));

var _UserProvider = _interopRequireDefault(require("./UserProvider"));

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
    user: (_, args, {
      injector
    }) => injector.get(_UserProvider.default).getUser(),
    users: (_, args, {
      injector
    }) => injector.get(_UserProvider.default).getUsers(),
    me: async (_, args, {
      injector
    }) => {
      const me = await injector.get(_AuthProvider.default).getMe();
      await injector.get(_AuthProvider.default).logIn(me.id);
      return me;
    },
    myContacts: (_, args, {
      injector
    }) => injector.get(_UserProvider.default).getMyContacts(),
    searchUsers: (_, {
      searchValue
    }, {
      injector
    }) => injector.get(_UserProvider.default).searchUsers(searchValue)
  },
  Mutation: {
    createUser: (_, {
      form
    }, {
      injector
    }) => injector.get(_UserProvider.default).createUser(form),
    deleteUser: (_, {
      id
    }, {
      injector
    }) => injector.get(_UserProvider.default).deleteUser(id),
    removeUserContacts: (_, {
      userId
    }, {
      injector
    }) => injector.get(_UserProvider.default).removeUserContacts(userId),
    uploadAvatar: async (_, {
      file
    }, {
      injector
    }) => injector.get(_UserProvider.default).uploadAvatar(file)
  },
  Subscription: {
    userActivityUpdated: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, args, {
        injector
      }) => injector.get(_graphqlSubscriptions.PubSub).asyncIterator([_subscriptions.USER_ACTIVITY_UPDATED]), async ({
        userActivityUpdated
      }, variables, {
        injector
      }) => {
        const {
          userId
        } = userActivityUpdated;
        const {
          contacts
        } = await injector.get(_AuthProvider.default).getMe();
        return !!(0, _find2.default)(contacts, {
          userId
        });
      })
    },
    userUpdated: {
      subscribe: (0, _graphqlSubscriptions.withFilter)((_, args, {
        injector
      }) => injector.get(_graphqlSubscriptions.PubSub).asyncIterator([_subscriptions.USER_UPDATED]), async ({
        userUpdated
      }, variables, {
        injector
      }) => {
        const {
          id: userId
        } = userUpdated;
        const {
          id,
          contacts
        } = await injector.get(_AuthProvider.default).getMe();
        return userId !== id && !!(0, _find2.default)(contacts, {
          userId
        });
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

  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\user\\userResolvers.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();