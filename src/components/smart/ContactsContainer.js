import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { GET_MY_CONTACTS } from '../../actions/authActions';

const getMyContacts = createQuery('getMyContacts', GET_MY_CONTACTS);

const ContactsContainer = adopt({
  getMyContacts,
});

export default ContactsContainer;
