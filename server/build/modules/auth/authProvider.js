"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _delay2 = _interopRequireDefault(require("lodash/delay"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _di = require("@graphql-modules/di");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _emailValidator = _interopRequireDefault(require("email-validator"));

var _DbProvider = _interopRequireDefault(require("../common/DbProvider"));

var _enums = require("../../db/models/enums");

var _apolloErrors = require("../../utils/apolloErrors");

var _helpers = require("../../utils/helpers");

var _nodemailer = _interopRequireDefault(require("../../utils/nodemailer"));

var _subscriptions = require("../subscriptions");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

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

let AuthProvider = (_dec = (0, _di.Injectable)({
  scope: _di.ProviderScope.Session
}), _dec2 = (0, _di.Inject)(_graphqlSubscriptions.PubSub), _dec(_class = (_class2 = (_temp = class AuthProvider {
  constructor() {
    _initializerDefineProperty(this, "pubsub", _descriptor, this);

    this.db = _DbProvider.default.db;
    this.user = null;

    this.getMe = async () => {
      try {
        const me = await this.db.User.findById(this.user.id);
        return me;
      } catch (e) {
        throw e;
      }
    };

    this.verifyInputData = async (field, value) => {
      try {
        const user = await this.db.User.getUserByField(field, value);

        if (user) {
          throw new _apolloErrors.BadInputError({
            message: `The provided ${field} is already exist.`,
            data: {
              invalidField: field
            }
          });
        }

        return !user;
      } catch (e) {
        throw e;
      }
    };

    this.signInValidation = async (username, password) => {
      try {
        const login = _emailValidator.default.validate(username) ? 'email' : 'username';
        const user = await this.db.User.getUserByField(login, username);

        if (!user) {
          throw new _apolloErrors.BadInputError({
            message: 'The provided username can\'t be found',
            data: {
              invalidField: 'username'
            }
          });
        }

        const {
          password: hash,
          regStatus
        } = user;
        const validPassword = await user.comparePassword(password, hash);
        const validRegistration = regStatus !== _enums.EMAIL_UNCONFIRMED;

        if (!validPassword) {
          throw new _apolloErrors.BadInputError({
            message: 'The provided password is incorrect',
            data: {
              invalidField: 'password'
            }
          });
        }

        if (!validRegistration) {
          throw new _apolloErrors.AuthenticationError({
            message: 'Your registration isn\'t completed.You need to confirm your email'
          });
        }

        return user;
      } catch (e) {
        throw e;
      }
    };

    this.signIn = async form => {
      try {
        const {
          username,
          password
        } = form;
        const user = await this.signInValidation(username, password);
        const tokens = await user.genTokens();
        const {
          id,
          regStatus
        } = user;
        await this.logIn(id);
        this.user = {
          id,
          regStatus
        };
        return tokens;
      } catch (e) {
        throw e;
      }
    };

    this.signUp = async form => {
      try {
        const {
          email,
          username
        } = form;
        await this.verifyInputData('email', email);
        await this.verifyInputData('username', username);
        const user = await this.db.User.create(form);
        const registerToken = await user.genToken('register');
        const res = await _nodemailer.default.sendEmailVerification(email, registerToken);
        return !!res;
      } catch (e) {
        throw e;
      }
    };

    this.signUpCompletion = async form => {
      try {
        const {
          id
        } = this.user;
        const {
          birthday
        } = form;
        const user = await this.db.User.findByIdAndUpdate(id, {
          $set: { ...form,
            displayName: (0, _helpers.getUserDisplayName)(form),
            birthday: birthday ? new Date(birthday) : birthday,
            regStatus: _enums.COMPLETED
          }
        }, {
          new: true
        });
        const tokens = await user.genTokens();
        await this.logIn(id);
        return tokens;
      } catch (e) {
        throw e;
      }
    };

    this.signUpAsyncValidation = async (field, value) => {
      try {
        const result = await this.verifyInputData(field, value);
        return {
          field,
          valid: result
        };
      } catch (e) {
        throw e;
      }
    };

    this.signInBySocialValidation = async (social, profile) => {
      try {
        const user = await this.db.User.getUserBySocial(social, profile);

        if (!user) {
          throw new _apolloErrors.AuthenticationError({
            message: 'User not found'
          });
        }

        return user;
      } catch (e) {
        throw e;
      }
    };

    this.signInBySocial = async (social, profile) => {
      try {
        const user = await this.signInBySocialValidation(social, profile);
        const tokens = await user.genTokens();
        const {
          id
        } = user;
        await this.logIn(id);
        return tokens;
      } catch (e) {
        throw e;
      }
    };

    this.signUpBySocialValidation = async (social, profile) => {
      try {
        const user = await this.db.User.getUserBySocial(social, profile);

        if (user) {
          throw new _apolloErrors.AuthenticationError({
            message: 'User is exist'
          });
        }

        return user;
      } catch (e) {
        throw e;
      }
    };

    this.signUpBySocial = async (social, profile) => {
      try {
        await this.signUpBySocialValidation(social, profile);
        const {
          id,
          name
        } = social;
        const user = await this.db.User.create({ ...profile,
          socials: {
            [name]: id
          },
          displayName: (0, _helpers.getUserDisplayName)(profile),
          regStatus: _enums.COMPLETED
        });
        const tokens = await user.genTokens();
        const {
          id: userId
        } = user;
        await this.logIn(userId);
        return tokens;
      } catch (e) {
        throw e;
      }
    };

    this.signOut = async userId => {
      try {
        let user = null;

        if (this.user) {
          user = await this.db.User.findById(this.user.id);
          this.user = null;
        } else {
          user = await this.db.User.findById(userId);
        }

        if (!user) {
          throw new Error('User is undefined');
        }

        const {
          id,
          lastDate
        } = user;
        await this.logOut(id, lastDate);
        return true;
      } catch (e) {
        throw e;
      }
    };

    this.updateUserActivity = async (userId, phase) => {
      const user = await this.db.User.findById(userId);
      const update = await user.logActivity(phase);
      const result = {
        userId,
        ...update
      };
      await this.pubsub.publish(_subscriptions.USER_ACTIVITY_UPDATED, {
        userActivityUpdated: result
      });
      return result;
    };

    this.logIn = async userId => {
      await this.updateUserActivity(userId, 'login');
    };

    this.logOut = async (userId, prevLastDate) => (0, _delay2.default)(async () => {
      const {
        lastDate
      } = await this.db.User.findById(userId);

      if ((0, _isEqual2.default)(prevLastDate, lastDate)) {
        await this.updateUserActivity(userId, 'logout');
      }
    }, 1000 * 60);
  }

  onRequest({
    session
  }) {
    if (session.req) {
      this.user = session.req.user;
    }
  }

  async onOperation({
    payload
  }) {
    const {
      tokens
    } = payload;

    if (tokens && (0, _has2.default)(tokens, 'token')) {
      const {
        token,
        refreshToken
      } = tokens;

      try {
        const {
          user
        } = await this.db.User.verifyTokens(token, refreshToken);
        this.user = user;
      } catch (e) {
        this.user = null;
      }
    }
  }

  async onDisconnect() {
    if (this.user) {
      const {
        id,
        lastDate
      } = await this.getMe();
      await this.logOut(id, lastDate);
    }

    this.user = null;
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pubsub", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
const _default = AuthProvider;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthProvider, "AuthProvider", "E:\\Projects\\graphichat\\server\\src\\modules\\auth\\AuthProvider.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\modules\\auth\\AuthProvider.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();