import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import gql from '../../gql';

const {
  SEARCH_USERS,
  CREATE_CHAT,
  GET_MY_CONTACTS,
} = gql;

const searchUsers = createQuery('searchUsers', SEARCH_USERS);
const getMyContacts = createQuery('getMyContacts', GET_MY_CONTACTS);
const createChat = createMutation('createChat', CREATE_CHAT);

const SearchDialogContainer = adopt({
  searchUsers,
  getMyContacts,
  createChat,
});

export default SearchDialogContainer;
