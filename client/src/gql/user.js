import { gql } from 'apollo-boost';

import {
  myContactFragment,
  myChatFragment,
  myFragment,
  userInfoFragment,
} from './fragments';

export const GET_INITIAL_DATA = gql`
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

export const GET_ME = gql`
  query GetMe {
    me @client {
      ...myData
    }
  }
  ${myFragment}
`;

export const GET_MY_CONTACTS = gql`
  query GetMyContacts {
    myContacts @client {
      ...myContactData
    }
  }
  ${myContactFragment}
`;

export const GET_MY_CHATS = gql`
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

export const SEARCH_USERS = gql`
  query SearchUsers($searchValue: String!) {
    searchUsers(searchValue: $searchValue) {
      ...myData
    }
  }
  ${myFragment}
`;

export const USER_ACTIVITY_SUBSCRIPTION = gql`
  subscription onUserActivityUpdated {
    userActivityUpdated {
      userId
      status
      lastDate
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($field: String!, $value: String!) {
    updateUser(field: $field, value: $value) {
      field
      value
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      sm
      md
    }
  }
`;

export const USER_UPDATE_SUBSCRIPTION = gql`
  subscription onUserUpdated {
    userUpdated {
      ...userInfoData
    }
  }
  ${userInfoFragment}
`;
