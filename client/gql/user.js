import gql from 'graphql-tag';

import {
  myContactFragment,
  myChatFragment,
  myFragment,
  userInfoFragment,
} from './fragments';

const GET_INITIAL_DATA = gql`
  query GetInitialData {
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

const GET_ME = gql`
  query GetMe {
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

const USER_ACTIVITY_SUBSCRIPTION = gql`
  subscription onUserActivityUpdated {
    userActivityUpdated {
      userId
      status
      lastDate
    }
  }
`;

const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      sm
      md
    }
  }
`;

const USER_UPDATE_SUBSCRIPTION = gql`
  subscription onUserUpdated {
    userUpdated {
      ...userInfoData
    }
  }
  ${userInfoFragment}
`;

export default {
  GET_INITIAL_DATA,
  GET_ME,
  GET_MY_CONTACTS,
  GET_MY_CHATS,
  SEARCH_USERS,
  UPLOAD_AVATAR,
  USER_ACTIVITY_SUBSCRIPTION,
  USER_UPDATE_SUBSCRIPTION,
};
