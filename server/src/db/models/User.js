import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pick, find } from 'lodash';

import mongoose from '../mongoose';
import { AuthenticationError, BadInputError } from '../../utils/apolloErrors';
import {
  EMAIL_UNCONFIRMED,
  UNCOMPLETED,
  COMPLETED,
  ONLINE,
  OFFLINE
} from './enums';

const tokensConfig = {
  token: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: '1m',
    model: ['id', 'regStatus'],
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: '10m',
    model: ['id', 'regStatus'],
  },
  register: {
    secret: process.env.REGISTER_TOKEN_SECRET,
    expiresIn: '1d',
    model: ['id'],
  },
};

const socialsSchema = new mongoose.Schema({
  google: String,
  facebook: String,
  github: String,
});

const contactSettingsSchema = new mongoose.Schema({
  sound: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Boolean,
    default: true,
  },
});

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  chatId: {
    type: String,
    require: true,
  },
  settings: contactSettingsSchema,
});

const avatarSchema = new mongoose.Schema({
  sm: String,
  md: String,
});

const userSchema = new mongoose.Schema({
  avatar: avatarSchema,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
    enum: [OFFLINE, ONLINE],
    default: OFFLINE,
  },
  createDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  lastDate: {
    type: Date,
    require: true,
    default: new Date(),
  },
  refreshToken: {
    type: String,
  },
  regStatus: {
    type: String,
    enum: [EMAIL_UNCONFIRMED, UNCOMPLETED, COMPLETED],
    require: true,
    default: EMAIL_UNCONFIRMED,
  },
  socials: socialsSchema,
  contacts: [contactSchema],
});

userSchema.pre('save', async function preSave(next) {
  if (this.isNew) {
    await this.updateOne({ createDate: new Date() });
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
      const salt = await bcrypt.genSalt(Math.random());
      const hash = await bcrypt.hash(this.password, salt);

      this.password = hash;
    } catch (e) {
      throw e;
    }
  },
  async comparePassword(password) {
    try {
      const result = await bcrypt.compare(password, this.password);

      return result;
    } catch (e) {
      return false;
    }
  },
  async genToken(type) {
    try {
      const { secret, expiresIn, model } = tokensConfig[type];
      const token = await jwt.sign({
        type: 'token',
        data: pick(this, model),
      }, secret, { expiresIn });

      return token;
    } catch (e) {
      throw e;
    }
  },
  async genTokens() {
    try {
      const token = await this.genToken('token');
      const refreshToken = await this.genToken('refresh');
      await this.updateOne({ refreshToken });

      return {
        token,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  },
  async logActivity(phase = 'login') {
    try {
      const status = phase === 'logout' ? OFFLINE : ONLINE;
      const lastDate = new Date();

      await this.updateOne({
        status,
        lastDate,
      });

      return {
        status,
        lastDate,
      };
    } catch (e) {
      throw e;
    }
  },
};

userSchema.statics = {
  async getUserByField(field, value) {
    try {
      const user = await this.findOne({ [field]: value });

      return user;
    } catch (e) {
      throw e;
    }
  },
  async getUserBySocial({ id, name }, { email }) {
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
      const { secret } = tokensConfig[type];
      const result = await jwt.verify(token, secret);

      return result;
    } catch (e) {
      throw new AuthenticationError({ message: 'Token is invalid' });
    }
  },
  async verifyTokens(token, refreshToken) {
    try {
      const { data } = await this.verifyToken(token, 'token');
      const user = await this.findById(data.id);

      if (!user) {
        throw new AuthenticationError({ message: 'User is not found' });
      }

      return {
        user: data,
      };
    } catch (e) {
      const { data } = await this.verifyToken(refreshToken, 'refresh');
      const user = await this.findById(data.id);
      const newTokens = await user.genTokens();

      return {
        user: data,
        newTokens,
      };
    }
  },
  async verifyEmail(regToken) {
    try {
      const { data: { id } } = await this.verifyToken(regToken, 'register');

      const user = await this.findByIdAndUpdate(id, { regStatus: UNCOMPLETED });
      const tokens = await user.genTokens(user);

      return tokens;
    } catch (e) {
      throw e;
    }
  },
  async addContact(id, userId, chatId) {
    try {
      const { contacts } = await this.findByIdAndUpdate(id,
        {
          $push: { contacts: { userId, chatId } },
        },
        {
          new: true,
        });
      const contact = find(contacts, { userId });

      return contact;
    } catch (e) {
      throw e;
    }
  },
  async verifyUsername(username) {
    try {
      const isExist = await this.findOne({ username });

      if (isExist) {
        throw new BadInputError({
          message: 'The provided username is already used',
          data: { invalidField: 'username' },
        });
      }
      return !isExist;
    } catch (e) {
      throw e;
    }
  },
};

const User = mongoose.model('User', userSchema);

export default User;
