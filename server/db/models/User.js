import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import EmailValidator from 'email-validator';
// import moment from 'moment';

import nodemailer from '../../utils/nodemailer';

const TOKEN_SECRET = 'chtkll_scrt_1_jhasdgljkahdg';
const REFRESH_TOKEN_SECRET = 'chtkll_scrt_2_;lkasdjg;lk';
const REGISTER_TOKEN_SECRET = 'chtkll_scrt_3_ookjasd;lgalsdg';

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
  } catch (err) {
    throw err;
  }
};

const genToken = async (user) => {
  try {
    const token = await jwt.sign({
      type: 'token',
      data: pick(user, ['id', 'isAdmin']),
    }, TOKEN_SECRET, { expiresIn: '5m' });

    return token;
  } catch (err) {
    throw err;
  }
};

const genRefreshToken = async (user) => {
  try {
    const token = await jwt.sign({
      type: 'refreshToken',
      data: pick(user, ['id']),
    }, REFRESH_TOKEN_SECRET, { expiresIn: '10m' });

    return token;
  } catch (err) {
    throw err;
  }
};

const genRegisterToken = async (user) => {
  try {
    const token = await jwt.sign({
      type: 'registerToken',
      data: pick(user, ['id']),
    }, REGISTER_TOKEN_SECRET, { expiresIn: '1d' });

    return token;
  } catch (err) {
    throw err;
  }
};

const genTokens = async (user) => {
  try {
    const token = await genToken(user);
    const refreshToken = await genRefreshToken(user);
    await user.update({ refreshToken });

    return {
      token,
      refreshToken,
    };
  } catch (err) {
    throw err;
  }
};

const verifyToken = async (token, secret) => {
  try {
    const result = await jwt.verify(token, secret);

    return result;
  } catch (err) {
    throw new AuthenticationError('Token is invalid');
  }
};

userSchema.pre('save', async function preSaving(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hash = await genHash(this.password);

    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods = {
  async checkPassword(password) {
    try {
      const result = await bcrypt.compare(password, this.password);

      return result;
    } catch (err) {
      throw err;
    }
  },
  async logCreation() {
    try {
      await this.update({
        createDate: new Date(),
        lastDate: new Date(),
      });
    } catch (err) {
      throw err;
    }
  },
  async logActivity(logout = false) {
    try {
      await this.update({
        status: logout ? OFFLINE : ONLINE,
        lastDate: new Date(),
      });
    } catch (err) {
      throw err;
    }
  },
  async confirmRegistration() {
    try {
      await this.update({ regStatus: COMPLETED });
    } catch (err) {
      throw err;
    }
  },
};

userSchema.statics = {
  async getUserById(id) {
    try {
      const user = await this.findById(id);

      return user;
    } catch (err) {
      throw err;
    }
  },
  async getUser(field, value) {
    try {
      const user = await this.findOne({ [field]: value });

      return user;
    } catch (err) {
      throw err;
    }
  },
  async verifyInputData(field, value) {
    try {
      const isExist = await this.findOne({ [field]: value });

      if (isExist) {
        throw new UserInputError(`Specified ${field} is already exist!`);
      }
      return isExist;
    } catch (err) {
      throw err;
    }
  },
  async signUpAsyncValidation(parent, { field, value }, { db }) {
    try {
      const result = await db.User.verifyInputData(field, value);

      return result;
    } catch (err) {
      throw err;
    }
  },
  async signUp(parent, { form }, { db }) {
    try {
      const { email, username } = form;
      await db.User.verifyInputData('email', email);
      await db.User.verifyInputData('username', username);

      const user = await db.User.create(form);
      await user.logCreation();

      const registerToken = await genRegisterToken(user);
      const response = await nodemailer.sendEmailVerification(user.email, registerToken);

      return !!response;
    } catch (err) {
      throw err;
    }
  },
  async verifySignUp(regToken) {
    try {
      const { data } = await verifyToken(regToken, REGISTER_TOKEN_SECRET);
      const { id } = data;

      const user = await this.getUserById(id);
      await user.confirmRegistration();
      await user.logActivity();

      const tokens = genTokens(user);

      return tokens;
    } catch (err) {
      throw err;
    }
  },
  async signInValidation(username, password) {
    try {
      const login = EmailValidator(username) ? 'email' : 'username';
      const user = this.getUser(login, username);

      if (!user) {
        throw new AuthenticationError('Specified username can\'t be found');
      }
      const { password: hash, regStatus } = user;
      const incorrectPassword = !user.comparePassword(password, hash);
      const invalidRegistration = regStatus === UNCOMPLETED;

      if (incorrectPassword) {
        throw new AuthenticationError('Specified password is incorrect');
      }
      if (invalidRegistration) {
        throw new AuthenticationError('Registration isn\'t completed');
      }

      return user;
    } catch (err) {
      throw err;
    }
  },
  async signIn(parent, { username, password }, { db }) {
    try {
      const user = await db.User.signInValidation(username, password);
      await user.logActivity();
      const tokens = genTokens(user);

      return tokens;
    } catch (err) {
      throw err;
    }
  },
  async delAccount(parent, { id }, { db }) {
    try {
      const result = db.User.findByIdAndDelete(id);

      return result;
    } catch (err) {
      throw err;
    }
  },
};

const User = mongoose.model('User', userSchema);

export default User;
