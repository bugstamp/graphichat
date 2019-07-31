"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("../mongoose"));

var _apolloErrors = require("../../utils/apolloErrors");

var _enums = require("./enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

const tokensConfig = {
  token: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: 60,
    model: ['id', 'regStatus']
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: '10m',
    model: ['id', 'regStatus']
  },
  register: {
    secret: process.env.REGISTER_TOKEN_SECRET,
    expiresIn: '1d',
    model: ['id']
  }
};
const socialsSchema = new _mongoose.default.Schema({
  google: String,
  facebook: String,
  github: String
});
const contactSettingsSchema = new _mongoose.default.Schema({
  sound: {
    type: Boolean,
    default: true
  },
  notification: {
    type: Boolean,
    default: true
  }
});
const contactSchema = new _mongoose.default.Schema({
  userId: {
    type: String,
    require: true
  },
  chatId: {
    type: String,
    require: true
  },
  settings: contactSettingsSchema
});
const avatarSchema = new _mongoose.default.Schema({
  sm: String,
  md: String
});
const userSchema = new _mongoose.default.Schema({
  avatar: avatarSchema,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  displayName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthday: {
    type: Date
  },
  gender: {
    type: String
  },
  status: {
    type: String,
    enum: [_enums.OFFLINE, _enums.ONLINE],
    default: _enums.OFFLINE
  },
  createDate: {
    type: Date,
    require: true,
    default: new Date()
  },
  lastDate: {
    type: Date,
    require: true,
    default: new Date()
  },
  refreshToken: {
    type: String
  },
  regStatus: {
    type: String,
    enum: [_enums.EMAIL_UNCONFIRMED, _enums.UNCOMPLETED, _enums.COMPLETED],
    require: true,
    default: _enums.EMAIL_UNCONFIRMED
  },
  socials: socialsSchema,
  contacts: [contactSchema]
});
userSchema.pre('save', async function preSave(next) {
  if (this.isNew) {
    await this.updateOne({
      createDate: new Date()
    });
  }

  if (!this.isModified('password')) {
    next();
  }

  try {
    await this.genHash();
    next();
  } catch (e) {
    next(e);
  }
});
userSchema.methods = {
  async genHash() {
    try {
      const salt = await _bcrypt.default.genSalt(Math.random());
      const hash = await _bcrypt.default.hash(this.password, salt);
      this.password = hash;
    } catch (e) {
      throw e;
    }
  },

  async comparePassword(password) {
    try {
      const result = await _bcrypt.default.compare(password, this.password);
      return result;
    } catch (e) {
      throw e;
    }
  },

  async genToken(type) {
    try {
      const {
        secret,
        expiresIn,
        model
      } = tokensConfig[type];
      const token = await _jsonwebtoken.default.sign({
        type: 'token',
        data: (0, _pick2.default)(this, model)
      }, secret, {
        expiresIn
      });
      return token;
    } catch (e) {
      throw e;
    }
  },

  async genTokens() {
    try {
      const token = await this.genToken('token');
      const refreshToken = await this.genToken('refresh');
      await this.updateOne({
        refreshToken
      });
      return {
        token,
        refreshToken
      };
    } catch (e) {
      throw e;
    }
  },

  async logActivity(phase = 'login') {
    try {
      const status = phase === 'logout' ? _enums.OFFLINE : _enums.ONLINE;
      const lastDate = new Date();
      await this.updateOne({
        status,
        lastDate
      });
      return {
        status,
        lastDate
      };
    } catch (e) {
      throw e;
    }
  }

};
userSchema.statics = {
  async getUserByField(field, value) {
    try {
      const user = await this.findOne({
        [field]: value
      });
      return user;
    } catch (e) {
      throw e;
    }
  },

  async getUserBySocial({
    id,
    name
  }, {
    email
  }) {
    try {
      let user;

      if (email) {
        user = await this.getUserByField('email', email);
      } else {
        user = await this.getUserByField(`socials.${name}`, id);
      }

      return user;
    } catch (e) {
      throw e;
    }
  },

  async verifyToken(token, type) {
    try {
      const {
        secret
      } = tokensConfig[type];
      const result = await _jsonwebtoken.default.verify(token, secret);
      return result;
    } catch (e) {
      throw new _apolloErrors.AuthenticationError({
        message: 'Token is invalid'
      });
    }
  },

  async verifyTokens(token, refreshToken) {
    try {
      const {
        data
      } = await this.verifyToken(token, 'token');
      const user = await this.findById(data.id);

      if (!user) {
        throw new _apolloErrors.AuthenticationError({
          message: 'User is not found'
        });
      }

      return {
        user: data
      };
    } catch (e) {
      const {
        data
      } = await this.verifyToken(refreshToken, 'refresh');
      const user = await this.findById(data.id);
      const newTokens = await user.genTokens();
      return {
        user: data,
        newTokens
      };
    }
  },

  async verifyEmail(regToken) {
    try {
      const {
        data: {
          id
        }
      } = await this.verifyToken(regToken, 'register');
      const user = await this.findByIdAndUpdate(id, {
        regStatus: _enums.UNCOMPLETED
      });
      const tokens = await user.genTokens(user);
      return tokens;
    } catch (e) {
      throw e;
    }
  },

  async addContact(id, userId, chatId) {
    try {
      const {
        contacts
      } = await this.findByIdAndUpdate(id, {
        $push: {
          contacts: {
            userId,
            chatId
          }
        }
      }, {
        new: true
      });
      const contact = (0, _find2.default)(contacts, {
        userId
      });
      return contact;
    } catch (e) {
      throw e;
    }
  }

};

const User = _mongoose.default.model('User', userSchema);

const _default = User;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(tokensConfig, "tokensConfig", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(socialsSchema, "socialsSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(contactSettingsSchema, "contactSettingsSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(contactSchema, "contactSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(avatarSchema, "avatarSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(userSchema, "userSchema", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(User, "User", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
  reactHotLoader.register(_default, "default", "E:\\Projects\\graphichat\\server\\src\\db\\models\\User.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();