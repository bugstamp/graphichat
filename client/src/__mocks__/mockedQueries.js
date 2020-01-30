import gql from '../gql';
import {
  uploadAvatar,
  me,
  user,
  userActivityUpdate,
  updateUserResult,
  contact,
  chat,
} from './mockedQueryData';

const {
  CHECK_SESSION_EXPIRATION,
  GET_ME,
  GET_INITIAL_DATA,
  UPDATE_USER,
  UPLOAD_AVATAR,
  USER_UPDATE_SUBSCRIPTION,
  USER_ACTIVITY_SUBSCRIPTION,
  CHAT_CREATED_SUBSCRIPTION,
  SIGN_OUT,
} = gql;

export const checkSessionExpirationMock = {
  request: {
    query: CHECK_SESSION_EXPIRATION,
    variables: {},
  },
  result: {
    data: false,
  },
};
export const getInitialDataMock = {
  request: {
    query: GET_INITIAL_DATA,
    variables: {},
  },
  result: {
    data: {
      me,
      myContacts: [],
      myChats: [],
    },
  },
};
export const getMeMock = {
  request: {
    query: GET_ME,
    variables: {},
  },
  result: {
    data: {
      me,
    },
  },
};
export const updateUserMock = {
  request: {
    query: UPDATE_USER,
    variables: {
      field: 'username',
      value: 'user',
    },
  },
  result: {
    data: {
      updateUser: updateUserResult,
    },
  },
};
export const uploadAvatarMock = {
  request: {
    query: UPLOAD_AVATAR,
    variables: {
      file: {
        filename: '',
        mimetype: '',
        encoding: '',
      },
    },
  },
  result: {
    data: {
      uploadAvatar,
    },
  },
};
export const userUpdateSubscriptionMock = {
  request: {
    query: USER_UPDATE_SUBSCRIPTION,
    variables: {},
  },
  result: {
    data: {
      userUpdated: user,
    },
  },
};
export const userActivitySubscriptionMock = {
  request: {
    query: USER_ACTIVITY_SUBSCRIPTION,
    variables: {},
  },
  result: {
    data: {
      userActivityUpdated: userActivityUpdate,
    },
  },
};
export const chatCreatedSubscriptionMock = {
  request: {
    query: CHAT_CREATED_SUBSCRIPTION,
    variables: {},
  },
  result: {
    data: {
      chatCreated: {
        contact,
        chat,
        __typename: 'ContactUpdate',
      },
    },
  },
};
export const signOutMock = {
  request: {
    query: SIGN_OUT,
    variables: {
      userId: me.id,
    },
  },
  result: {
    data: true,
  },
};
