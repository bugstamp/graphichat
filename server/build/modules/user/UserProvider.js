"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _di = require("@graphql-modules/di");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _sharp = _interopRequireDefault(require("sharp"));

var _DbProvider = _interopRequireDefault(require("../common/DbProvider"));

var _AuthProvider = _interopRequireDefault(require("../auth/AuthProvider"));

var _helpers = require("../../utils/helpers");

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

let UserProvider = (_dec = (0, _di.Injectable)({
  scope: _di.ProviderScope.Session
}), _dec2 = (0, _di.Inject)(_AuthProvider.default), _dec3 = (0, _di.Inject)(_graphqlSubscriptions.PubSub), _dec(_class = (_class2 = (_temp = class UserProvider {
  constructor() {
    _initializerDefineProperty(this, "authProvider", _descriptor, this);

    _initializerDefineProperty(this, "pubsub", _descriptor2, this);

    this.db = _DbProvider.default.db;

    this.getUser = async userId => {
      try {
        const user = this.db.User.findById(userId);
        return user;
      } catch (e) {
        throw e;
      }
    };

    this.getUsers = async () => {
      try {
        const users = await this.db.User.find({});
        return users;
      } catch (e) {
        throw e;
      }
    };

    this.getMyContacts = async () => {
      try {
        const {
          contacts
        } = await this.authProvider.getMe();
        const myContacts = [];

        if (!(0, _isEmpty2.default)(contacts)) {
          return await (0, _map2.default)(contacts, async ({
            id,
            userId,
            chatId
          }) => {
            const contact = await this.db.User.findById(userId);
            return {
              id,
              chatId,
              userInfo: contact
            };
          });
        }

        return myContacts;
      } catch (e) {
        throw e;
      }
    };

    this.searchUsers = async searchValue => {
      try {
        const {
          id
        } = this.authProvider.user;
        let usersList = [];

        if (searchValue) {
          const isSearchByUsername = searchValue[0] === '@';

          if (isSearchByUsername) {
            const username = searchValue.slice(1);
            usersList = await this.db.User.find({
              username: {
                $regex: username,
                $options: 'i'
              }
            });
          } else {
            usersList = await this.db.User.find({
              displayName: {
                $regex: searchValue,
                $options: 'i'
              }
            });
          }
        }

        return (0, _filter2.default)(usersList, user => user.id !== id);
      } catch (e) {
        throw e;
      }
    };

    this.createUser = async form => {
      try {
        const displayName = (0, _helpers.getUserDisplayName)(form);
        const newUser = await this.db.User.create({ ...form,
          displayName
        });
        return newUser;
      } catch (e) {
        throw e;
      }
    };

    this.uploadAvatar = async file => {
      try {
        const {
          id
        } = this.authProvider.user;
        const {
          filename,
          createReadStream
        } = await file;
        const buffer = await (0, _helpers.fileToBuffer)(filename, createReadStream);
        const compressedJpeg = await (0, _sharp.default)(buffer).jpeg({
          quality: 80
        }).toBuffer();
        const sm = await (0, _sharp.default)(compressedJpeg).resize({
          width: 50,
          height: 50
        }).toBuffer();
        const md = await (0, _sharp.default)(compressedJpeg).resize({
          width: 640,
          height: 640
        }).toBuffer();
        const smBase64 = `data:image/jpeg;base64,${sm.toString('base64')}`;
        const mdBase64 = `data:image/jpeg;base64,${md.toString('base64')}`;
        const avatar = {
          sm: smBase64,
          md: mdBase64
        };
        const user = await this.db.User.findByIdAndUpdate(id, {
          avatar
        }, {
          new: true
        });
        await this.pubsub.publish(_subscriptions.USER_UPDATED, {
          userUpdated: user
        });
        return avatar;
      } catch (e) {
        throw e;
      }
    };

    this.removeUserContacts = async userId => {
      try {
        const user = await this.db.User.findByIdAndUpdate(userId, {
          contacts: []
        }, {
          new: true
        });
        return user;
      } catch (e) {
        throw e;
      }
    };

    this.deleteUser = async userId => {
      try {
        const result = await this.db.User.findByIdAndDelete(userId);
        return result;
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
const _default = UserProvider;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserProvider, "UserProvider", "E:\\Projects\\graphichat\\server\\src\\modules\\user\\UserProvider.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\user\\UserProvider.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();