import { Injectable, Inject, ProviderScope } from '@graphql-modules/di';
import { map, isEmpty, filter } from 'lodash';

import DbProvider from '../common/DbProvider';
import AuthProvider from '../auth/AuthProvider';

import { getUserDisplayName } from '../../utils/helpers';

@Injectable({
  scope: ProviderScope.Session,
})
class UserProvider {
  @Inject(AuthProvider)
  authProvider;

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
      const { id } = this.authProvider.user;
      const { contacts } = await this.db.User.findById(id);
      const myContacts = [];

      if (!isEmpty(contacts)) {
        return await map(contacts, async ({ userId, chatId }) => {
          const contact = await this.db.User.findById(userId);

          return { chatId, userInfo: contact };
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
      const displayName = getUserDisplayName(form);
      const newUser = await this.db.User.create({ ...form, displayName });

      return newUser;
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
