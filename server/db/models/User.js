import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { includes } from 'lodash';
// import moment from 'moment';

const jwtSecret = 'chatzilla2018';

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
  login: {
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
    enum: ['OFFLINE', 'ONLINE'],
    default: 'OFFLINE',
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
});

const genSalt = async () => {
  try {
    const salt = await bcrypt.genSalt(Math.random());

    return salt;
  } catch (err) {
    throw err;
  }
};

const hashPassword = async (password, salt) => {
  try {
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (err) {
    throw err;
  }
};

const comparePassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);

    return result;
  } catch (err) {
    throw err;
  }
};

const genToken = async (data) => {
  try {
    const token = await jwt.sign({ type: 'auth', data }, jwtSecret, {
      expiresIn: '30s',
    });
    return token;
  } catch (err) {
    throw err;
  }
};

const genRefreshToken = async () => {
  try {
    const token = await jwt.sign({ type: 'refresh' }, jwtSecret, {
      expiresIn: '1m',
    });
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyToken = async (token) => {
  try {
    const result = await jwt.verify(token, jwtSecret);

    return result;
  } catch (err) {
    throw err;
  }
};

const isEmail = (login) => {
  if (includes(login, '@')) {
    return true;
  }
  return false;
}

userSchema.pre('save', async function preSaving(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await genSalt();
    const hash = await hashPassword(this.password, salt);

    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods = {
  async checkPassword(password) {
    try {
      const result = await comparePassword(password, this.password);

      return result;
    } catch (err) {
      throw err;
    }
  },
};

userSchema.statics = {
  async signUp(form) {}
};

const User = mongoose.model('User', userSchema);

export default User;
