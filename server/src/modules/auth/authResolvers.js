import nodemailer from '../../utils/nodemailer';
import { COMPLETED } from '../../db/models/enums';
import { getUserDisplayName } from '../../utils/helpers';

export default {
  Mutation: {
    async signIn(parent, { form }, { db }) {
      try {
        const { username, password } = form;
        const user = await db.User.signInValidation(username, password);
        await user.logActivity();
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
        const registerToken = await user.genToken('register');
        const res = await nodemailer.sendEmailVerification(email, registerToken);

        return !!res;
      } catch (e) {
        throw e;
      }
    },
    async signUpCompletion(parent, { form }, { db, user: { id } }) {
      try {
        const { birthday } = form;
        const user = await db.User.findByIdAndUpdate(id, {
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

        const { id, name } = social;
        const user = await db.User.create({
          ...profile,
          socials: { [name]: id },
          displayName: getUserDisplayName(profile),
          regStatus: COMPLETED,
        });
        const tokens = await user.genTokens();

        return tokens;
      } catch (e) {
        throw e;
      }
    },
    async signOut(parent, args, { db, user }) {
      try {
        const { id } = user;
        const currentUser = await db.User.findById(id);
        await currentUser.logActivity('logout');

        return currentUser;
      } catch (e) {
        throw e;
      }
    },
  },
};
