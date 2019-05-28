import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { PubSub } from 'graphql-subscriptions';
import EmailValidator from 'email-validator';
import { has, delay, isEqual } from 'lodash';

import DbProvider from '../common/DbProvider';

import {
  EMAIL_UNCONFIRMED,
  COMPLETED,
} from '../../db/models/enums';
import {
  AuthenticationError,
  BadInputError,
} from '../../utils/apolloErrors';
import { getUserDisplayName } from '../../utils/helpers';
import nodemailer from '../../utils/nodemailer';

import { USER_ACTIVITY_UPDATE } from '../subscriptions';

@Injectable({
  scope: ProviderScope.Session,
})
class AuthProvider {
  @Inject(PubSub)
  pubsub;

  db = DbProvider.db;

  user = null;

  onRequest({ session }) {
    if (session.req) {
      this.user = session.req.user;
    }
  }

  async onOperation({ payload }) {
    const { tokens } = payload;

    if (tokens && has(tokens, 'token')) {
      const { token, refreshToken } = tokens;

      try {
        const { user } = await this.db.User.verifyTokens(token, refreshToken);

        this.user = user;
      } catch (e) {
        this.user = null;
      }
    }
  }

  async onDisconnect() {
    if (this.user) {
      const { lastDate } = await this.getMe();

      await this.logOut(this.user.id, lastDate);
    }
    this.user = null;
  }

  getMe = async () => {
    try {
      const me = await this.db.User.findById(this.user.id);

      return me;
    } catch (e) {
      throw e;
    }
  }

  verifyInputData = async (field, value) => {
    try {
      const user = await this.db.User.getUserByField(field, value);

      if (user) {
        throw new BadInputError({
          message: `The provided ${field} is already exist.`,
          data: { invalidField: field },
        });
      }
      return !user;
    } catch (e) {
      throw e;
    }
  }

  signInValidation = async (username, password) => {
    try {
      const login = EmailValidator.validate(username) ? 'email' : 'username';
      const user = await this.db.User.getUserByField(login, username);

      if (!user) {
        throw new BadInputError({
          message: 'The provided username can\'t be found',
          data: { invalidField: 'username' },
        });
      }
      const { password: hash, regStatus } = user;
      const validPassword = await user.comparePassword(password, hash);
      const validRegistration = regStatus !== EMAIL_UNCONFIRMED;

      if (!validPassword) {
        throw new BadInputError({
          message: 'The provided password is incorrect',
          data: { invalidField: 'password' },
        });
      }
      if (!validRegistration) {
        throw new AuthenticationError({
          message: 'Your registration isn\'t completed.You need to confirm your email',
        });
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  signIn = async (form) => {
    try {
      const { username, password } = form;
      const user = await this.signInValidation(username, password);
      const tokens = await user.genTokens();
      const { id, regStatus } = user;
      await this.logIn(id);
      this.user = {
        id,
        regStatus,
      };

      return tokens;
    } catch (e) {
      throw e;
    }
  }

  signUp = async (form) => {
    try {
      const { email, username } = form;
      await this.verifyInputData('email', email);
      await this.verifyInputData('username', username);

      const user = await this.db.User.create(form);
      const registerToken = await user.genToken('register');
      const res = await nodemailer.sendEmailVerification(email, registerToken);

      return !!res;
    } catch (e) {
      throw e;
    }
  }

  signUpCompletion = async (form) => {
    try {
      const { id } = this.user;
      const { birthday } = form;
      const user = await this.db.User.findByIdAndUpdate(id, {
        $set: {
          ...form,
          displayName: getUserDisplayName(form),
          birthday: birthday ? new Date(birthday) : birthday,
          regStatus: COMPLETED,
        },
      }, {
        new: true,
      });
      const tokens = await user.genTokens();
      await this.logIn(id);

      return tokens;
    } catch (e) {
      throw e;
    }
  }

  signUpAsyncValidation = async (field, value) => {
    try {
      const result = await this.verifyInputData(field, value);

      return {
        field,
        valid: result,
      };
    } catch (e) {
      throw e;
    }
  }

  signInBySocialValidation = async (social, profile) => {
    try {
      const user = await this.db.User.getUserBySocial(social, profile);

      if (!user) {
        throw new AuthenticationError({ message: 'User not found' });
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  signInBySocial = async (social, profile) => {
    try {
      const user = await this.signInBySocialValidation(social, profile);
      const tokens = await user.genTokens();
      const { id } = user;
      await this.logIn(id);

      return tokens;
    } catch (e) {
      throw e;
    }
  }

  signUpBySocialValidation = async (social, profile) => {
    try {
      const user = await this.db.User.getUserBySocial(social, profile);

      if (user) {
        throw new AuthenticationError({ message: 'User is exist' });
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  signUpBySocial = async (social, profile) => {
    try {
      await this.signUpBySocialValidation(social, profile);

      const { id, name } = social;
      const user = await this.db.User.create({
        ...profile,
        socials: { [name]: id },
        displayName: getUserDisplayName(profile),
        regStatus: COMPLETED,
      });
      const tokens = await user.genTokens();
      const { id: userId } = user;
      await this.logIn(userId);

      return tokens;
    } catch (e) {
      throw e;
    }
  }

  signOut = async () => {
    try {
      const { id, lastDate } = await this.getMe();
      await this.logOut(id, lastDate);
      this.user = null;

      return true;
    } catch (e) {
      throw e;
    }
  }

  updateUserActivity = async (userId, phase) => {
    const user = await this.db.User.findById(userId);
    const update = await user.logActivity(phase);
    const result = {
      userId,
      ...update,
    };
    await this.pubsub.publish(USER_ACTIVITY_UPDATE, { userActivityUpdated: result });

    return result;
  }

  logIn = async (userId) => {
    await this.updateUserActivity(userId, 'login');
  }

  logOut = async (userId, prevLastDate) => delay(async () => {
    const { lastDate } = await this.db.User.findById(userId);

    if (isEqual(prevLastDate, lastDate)) {
      await this.updateUserActivity(userId, 'logout');
    }
  }, (1000 * 60));
}

export default AuthProvider;
