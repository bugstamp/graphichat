import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import EmailValidator from 'email-validator';

import mongoose from '../mongoose';

const TOKEN_SECRET = 'chtkll_scrt_1_jhasdgljkahdg';
const TOKEN_EXPIRES = '5m';
const REFRESH_TOKEN_SECRET = 'chtkll_scrt_2_;lkasdjg;lk';
const REFRESH_TOKEN_EXPIRES = '10m';
const REGISTER_TOKEN_SECRET = 'chtkll_scrt_3_ookjasd;lgalsdg';
const REGISTER_TOKEN_EXPIRES = '10m';

const UNCOMPLETED = 'UNCOMPLETED';
const COMPLETED = 'COMPLETED';
const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';

const friendSchema = new mongoose.Schema({
  userId: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  // avatar: {},
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
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
  friends: [friendSchema],
  refreshToken: {
    type: String,
  },
  regStatus: {
    type: String,
    enum: [UNCOMPLETED, COMPLETED],
    require: true,
    default: UNCOMPLETED,
  },
});

const genHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(Math.random());
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (e) {
    throw e;
  }
};

userSchema.pre('save', async function prevSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await genHash(this.password);
    this.password = hash;

    return next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods = {
  async comparePassword(password) {
    try {
      const result = await bcrypt.compare(password, this.password);

      return result;
    } catch (e) {
      throw e;
    }
  },
  async genToken() {
    try {
      const token = await jwt.sign({
        type: 'token',
        data: pick(this, ['id', 'isAdmin']),
      }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES });

      return token;
    } catch (e) {
      throw e;
    }
  },
  async genRefreshToken() {
    try {
      const refreshToken = await jwt.sign({
        type: 'refreshToken',
        data: pick(this, ['id']),
      }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
      await this.updateOne({ refreshToken });

      return refreshToken;
    } catch (e) {
      throw e;
    }
  },
  async genRegisterToken() {
    try {
      const registerToken = await jwt.sign({
        type: 'registerToken',
        data: pick(this, ['id']),
      }, REGISTER_TOKEN_SECRET, { expiresIn: REGISTER_TOKEN_EXPIRES });

      return registerToken;
    } catch (e) {
      throw e;
    }
  },
  async genTokens() {
    try {
      const token = await this.genToken();
      const refreshToken = await this.genRefreshToken();

      return {
        token,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  },
  async logCreation() {
    try {
      await this.updateOne({
        createDate: new Date(),
        lastDate: new Date(),
      });
    } catch (e) {
      throw e;
    }
  },
  async logActivity(phase = 'login') {
    try {
      await this.updateOne({
        status: phase === 'logout' ? OFFLINE : ONLINE,
        lastDate: new Date(),
      });
    } catch (e) {
      throw e;
    }
  },
  async confirmRegistration() {
    try {
      await this.updateOne({ regStatus: COMPLETED });
    } catch (e) {
      throw e;
    }
  },
};

userSchema.statics = {
  async getUserById(id) {
    try {
      const user = await this.findById(id);

      return user;
    } catch (e) {
      throw e;
    }
  },
  async getUserByField(field, value) {
    try {
      const user = await this.findOne({ [field]: value });

      return user;
    } catch (e) {
      throw e;
    }
  },
  async verifyToken(token, secret) {
    try {
      const result = await jwt.verify(token, secret);

      return result;
    } catch (e) {
      return e;
    }
  },
  async verifyTokens(token, refreshToken) {
    try {
      const { data } = await this.verifyToken(token, TOKEN_SECRET);

      return {
        user: data,
      };
    } catch (e) {
      const { data } = await this.verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
      const { id } = data;
      const user = await this.getUserById(id);
      const newTokens = await user.genTokens();

      return {
        user: data,
        newTokens,
      };
    }
  },
  async verifyInputData(field, value) {
    try {
      const user = await this.getUserByField(field, value);
      const isExist = !!user;

      if (isExist) {
        throw new UserInputError(`Specified ${field} is already exist!`);
      }
      return isExist;
    } catch (e) {
      throw e;
    }
  },
  async verifySignUp(regToken) {
    try {
      const { data } = await this.verifyToken(regToken, REGISTER_TOKEN_SECRET);
      const { id } = data;

      const user = await this.getUserById(id);
      await user.confirmRegistration();
      await user.logActivity();
      const tokens = await user.genTokens(user);

      return tokens;
    } catch (e) {
      throw e;
    }
  },
  async signInValidation(username, password) {
    try {
      const login = EmailValidator.validate(username) ? 'email' : 'username';
      const user = await this.getUserByField(login, username);

      if (!user) {
        throw new AuthenticationError('Specified username can\'t be found');
      }
      const { password: hash, regStatus } = user;
      const correctPassword = await user.comparePassword(password, hash);
      const invalidRegistration = regStatus === UNCOMPLETED;

      if (!correctPassword) {
        throw new AuthenticationError('Specified password is incorrect');
      }
      if (invalidRegistration) {
        throw new AuthenticationError('Registration isn\'t completed');
      }

      return user;
    } catch (e) {
      throw e;
    }
  },
};

const User = mongoose.model('User', userSchema);

export default User;
