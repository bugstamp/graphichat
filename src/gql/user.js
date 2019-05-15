import gql from 'graphql-tag';

import { myContactFragment, myChatFragment, myFragment } from './fragments';

const GET_ME = gql`
  query GetMe {
    me {
      ...myData
    }
    myContacts {
      ...myContactData
    }
    myChats {
      ...myChatData
    }
  }
  ${myContactFragment}
  ${myChatFragment}
  ${myFragment}
`;

const GET_ME_LOCAL = gql`
  query GetMeLocal {
    me @client {
      ...myData
    }
  }
  ${myFragment}
`;

const GET_MY_CONTACTS = gql`
  query GetMyContacts {
    myContacts @client {
      ...myContactData
    }
  }
  ${myContactFragment}
`;

const GET_MY_CHATS = gql`
  query GetMyChats {
    myContacts @client {
      ...myContactData
    }
    myChats @client {
      ...myChatData
    }
  }
  ${myContactFragment}
  ${myChatFragment}
`;

const SEARCH_USERS = gql`
  query SearchUsers($searchValue: String!) {
    searchUsers(searchValue: $searchValue) {
      ...myData
    }
  }
  ${myFragment}
`;

export default {
  GET_ME,
  GET_ME_LOCAL,
  GET_MY_CONTACTS,
  GET_MY_CHATS,
  SEARCH_USERS,
};
