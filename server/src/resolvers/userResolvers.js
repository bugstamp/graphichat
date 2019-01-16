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
  },
  Mutation: {
    async signIn(parent, { username, password }, { db }) {
      try {
        const user = await db.User.signInValidation(username, password);
        const tokens = await user.genTokens();
        await user.logActivity();

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

        const registerToken = await user.genRegisterToken(user);
        const response = await nodemailer.sendEmailVerification(user.email, registerToken);

        return !!response;
      } catch (e) {
        throw e;
      }
    },
    async signUpAsyncValidation(parent, { field, value }, { db }) {
      try {
        const result = await db.User.verifyInputData(field, value);

        return result;
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
    async removeUser(parent, { id }, { db }) {
      try {
        const result = db.User.findByIdAndDelete(id);

        return result;
      } catch (e) {
        throw e;
      }
    },
  },
};
