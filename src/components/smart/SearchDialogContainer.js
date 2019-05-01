import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { SEARCH_USERS, CREATE_CHAT, GET_MY_CONTACTS } from '../../actions/authActions';

const searchUsers = createQuery('searchUsers', SEARCH_USERS);
const getMyContacts = createQuery('getMyContacts', GET_MY_CONTACTS);
const createChat = createMutation('createChat', CREATE_CHAT);

const SearchDialogContainer = adopt({
  searchUsers,
  getMyContacts,
  createChat,
});

export default SearchDialogContainer;
