import { adopt } from 'react-adopt';

import { createQuery } from '../../apollo/utils';
import { GET_MY_CHATS } from '../../actions/authActions';

const getMyChats = createQuery('getMyChats', GET_MY_CHATS);

const ContactsContainer = adopt({
  getMyChats,
});

export default ContactsContainer;
