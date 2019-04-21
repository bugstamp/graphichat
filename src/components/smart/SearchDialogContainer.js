import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { SEARCH_USERS, ADD_CONTACT, GET_MY_CONTACTS } from '../../actions/authActions';

const searchUsers = createQuery('searchUsers', SEARCH_USERS);
const addContact = createMutation('addContact', ADD_CONTACT, {
  update(cache, { data: { addContact } }) {
    const { myContacts } = cache.readQuery({ query: GET_MY_CONTACTS });
    console.log(myContacts);
  },
});

const SearchDialogContainer = adopt({
  searchUsers,
  addContact,
});

export default SearchDialogContainer;
