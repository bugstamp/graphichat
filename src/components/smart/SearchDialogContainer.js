import { adopt } from 'react-adopt';
import { concat } from 'lodash';

import { createMutation, createQuery } from '../../apollo/utils';
import { SEARCH_USERS, ADD_CONTACT, GET_MY_CONTACTS } from '../../actions/authActions';

const searchUsers = createQuery('searchUsers', SEARCH_USERS);
const getMyContacts = createQuery('getMyContacts', GET_MY_CONTACTS);
const addContact = createMutation('addContact', ADD_CONTACT, {
  update(cache, { data: { addContact: contact } }) {
    const { myContacts } = cache.readQuery({ query: GET_MY_CONTACTS });
    cache.writeQuery({
      query: GET_MY_CONTACTS,
      data: { myContacts: concat(myContacts, contact) },
    });
  },
});

const SearchDialogContainer = adopt({
  searchUsers,
  getMyContacts,
  addContact,
});

export default SearchDialogContainer;
