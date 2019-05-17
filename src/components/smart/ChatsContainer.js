import { adopt } from 'react-adopt';

import { createQuery } from '../../apollo/utils';
import gql from '../../gql';

const { GET_MY_CHATS } = gql;

const getMyChats = createQuery('getMyChats', GET_MY_CHATS);

const ContactsContainer = adopt({
  getMyChats,
});

export default ContactsContainer;
