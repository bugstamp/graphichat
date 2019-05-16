import { adopt } from 'react-adopt';

import { createQuery } from '../../apollo/utils';
import gql from '../../gql';

const { GET_MY_CHATS, GET_ME_LOCAL } = gql;

const getMyChats = createQuery('getMyChats', GET_MY_CHATS);
const getMeLocal = createQuery('getMeLocal', GET_ME_LOCAL);

const ContactsContainer = adopt({
  getMyChats,
  getMeLocal,
});

export default ContactsContainer;
