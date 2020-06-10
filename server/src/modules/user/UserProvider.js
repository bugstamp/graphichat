import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { PubSub } from 'graphql-subscriptions';
import sharp from 'sharp';
import { map, isEmpty, filter } from 'lodash';

import DbProvider from '../common/DbProvider';
import AuthProvider from '../auth/AuthProvider';

import { fileToBuffer } from '../../utils/helpers';
import { USER_UPDATED } from '../subscriptions';

@Injectable({
  scope: ProviderScope.Session,
})
class UserProvider {
  @Inject(AuthProvider)
  authProvider;

  @Inject(PubSub)
  pubsub;

  db = DbProvider.db;

  getUser = async (userId) => {
    try {
      const user = this.db.User.findById(userId);

      return user;
    } catch (e) {
      throw e;
    }
  }

  getUsers = async () => {
    try {
      const users = await this.db.User.find({});

      return users;
    } catch (e) {
      throw e;
    }
  }

  getMyContacts = async () => {
    try {
      const { contacts } = await this.authProvider.getMe();
      const myContacts = [];

      if (!isEmpty(contacts)) {
        return await map(contacts, async ({ id, userId, chatId }) => {
          const contact = await this.db.User.findById(userId);

          return { id, chatId, userInfo: contact };
        });
      }
      return myContacts;
    } catch (e) {
      throw e;
    }
  }

  searchUsers = async (searchValue) => {
    try {
      const { id } = this.authProvider.user;
      let usersList = [];

      if (searchValue) {
        const isSearchByUsername = searchValue[0] === '@';

        if (isSearchByUsername) {
          const username = searchValue.slice(1);

          usersList = await this.db.User.find({ username: { $regex: username, $options: 'i' } });
        } else {
          usersList = await this.db.User.find({ displayName: { $regex: searchValue, $options: 'i' } });
        }
      }
      return filter(usersList, user => user.id !== id);
    } catch (e) {
      throw e;
    }
  }

  createUser = async (form) => {
    try {
      const newUser = await this.db.User.create(form);

      return newUser;
    } catch (e) {
      throw e;
    }
  }

  updateUser = async (field, value) => {
    try {
      const { id } = this.authProvider.user;

      if (field === 'username') {
        await this.db.User.verifyUsername(value);
      }

      const user = await this.db.User.findByIdAndUpdate(id, { [field]: value }, { new: true });
      await this.pubsub.publish(USER_UPDATED, { userUpdated: user });

      return {
        field,
        value,
      };
    } catch (e) {
      throw e;
    }
  }

  uploadAvatar = async (file) => {
    try {
      const { id } = this.authProvider.user;
      const { filename, createReadStream } = await file;
      const buffer = await fileToBuffer(filename, createReadStream);
      const compressedJpeg = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
      const sm = await sharp(compressedJpeg).resize({ width: 50, height: 50 }).toBuffer();
      const md = await sharp(compressedJpeg).resize({ width: 640, height: 640 }).toBuffer();
      const smBase64 = `data:image/jpeg;base64,${sm.toString('base64')}`;
      const mdBase64 = `data:image/jpeg;base64,${md.toString('base64')}`;
      const avatar = {
        sm: smBase64,
        md: mdBase64,
      };

      const user = await this.db.User.findByIdAndUpdate(id, { avatar }, { new: true });
      await this.pubsub.publish(USER_UPDATED, { userUpdated: user });

      return avatar;
    } catch (e) {
      throw e;
    }
  }

  removeUserContacts = async (userId) => {
    try {
      const user = await this.db.User.findByIdAndUpdate(userId, { contacts: [] }, { new: true });

      return user;
    } catch (e) {
      throw e;
    }
  }

  deleteUser = async (userId) => {
    try {
      const result = await this.db.User.findByIdAndDelete(userId);

      return result;
    } catch (e) {
      throw e;
    }
  }
}

export default UserProvider;
