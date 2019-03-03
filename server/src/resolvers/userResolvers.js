import { AuthenticationError } from 'apollo-server-express';

import nodemailer from '../utils/nodemailer';

export default {
  Query: {
    async getUser(parent, { id }, { db }) {
      try {
        const user = db.User.findById(id);

        return user;
      } catch (e) {
        throw e;
      }
    },
    async getUsers(parent, args, { db }) {
      try {
        const users = await db.User.find({});

        return users;
      } catch (e) {
        throw e;
      }
    },
    async getMe(parent, args, { db, user }) {
      try {
        if (!user) {
          throw new AuthenticationError();
        }
        const me = db.User.findById(user.id);

        return me;
      } catch (e) {
        throw e;
      }
    },
  },
  Mutation: {
    async signIn(parent, { username, password }, { db }) {
      try {
        const user = await db.User.signInValidation(username, password);
        await user.logActivity();
        const tokens = await user.genTokens();

        return tokens;
      } catch (e) {
        throw e;
      }
    },
    async signInBySocial(parent, { social, profile }, { db }) {
      try {
        const user = await db.User.signInBySocialValidation(social, profile);
        await user.logActivity();
        const tokens = await user.genTokens();

        return tokens;
      } catch (e) {
        throw e;
      }
    },
    async signUpBySocial(parent, { social, profile }, { db }) {
      try {
        await db.User.signUpBySocialValidation(social, profile);

        const { id, ...rest } = profile;
        const { firstName, lastName } = rest;
        const user = await db.User.create({
          socials: { [social]: id },
          displayName: `${firstName} ${lastName}`,
          ...rest,
        });
        await user.logCreation();
        await user.confirmSignUp();

        const tokens = await user.genTokens();

        return tokens;
      } catch (e) {
        throw e;
      }
    },
    async signUp(parent, { form }, { db }) {
      try {
        const { email, username } = form;
        await db.User.verifyInputData('email', email);
        await db.User.verifyInputData('username', username);

        const user = await db.User.create(form);
        await user.logCreation();

        const registerToken = await user.genRegisterToken();
        const response = await nodemailer.sendEmailVerification(email, registerToken);

        return !!response;
      } catch (e) {
        throw e;
      }
    },
    async signUpCompletion(parent, { form }, { db, user: { id } }) {
      try {
        const { firstName, lastName, birthday } = form;
        const displayName = `${firstName} ${lastName}`;

        const user = await db.User.findByIdAndUpdate(id, {
          $set: {
            ...form,
            displayName,
            birthday: birthday ? new Date(birthday) : birthday,
            regStatus: 'COMPLETED',
          },
        }, {
          new: true,
        });
        const tokens = await user.genTokens();

        return tokens;
      } catch (e) {
        throw e;
      }
    },
    async signUpAsyncValidation(parent, { field, value }, { db }) {
      try {
        const result = await db.User.verifyInputData(field, value);

        return {
          field,
          valid: result,
        };
      } catch (e) {
        throw e;
      }
    },
    async signOut(parent, { id }, { db }) {
      try {
        const user = await db.User.findById(id);
        await user.logActivity('logout');

        return user;
      } catch (e) {
        throw e;
      }
    },
    async deleteUser(parent, { id }, { db }) {
      try {
        const result = db.User.findByIdAndDelete(id);

        return result;
      } catch (e) {
        throw e;
      }
    },
  },
};
