import gql from '../gql';
import {
  uploadAvatar,
  me,
  user,
  userActivityUpdate,
  updateUserResult,
  contact,
  chat,
  signInForm,
  signUpForm,
  signUpCompletionForm,
  socialProfile,
  socialUserProfile,
  tokens,
} from './mockedQueryData';
import { BadInputError } from './mockedErrors';

const {
  SIGN_IN,
  SIGN_IN_BY_SOCIAL,
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
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

export const signInMock = {
  request: {
    query: SIGN_IN,
    variables: {
      form: signInForm,
    },
  },
  result: {
    data: {
      signIn: tokens,
    },
  },
};
export const signInMockWithErrors = {
  ...signInMock,
  result: {
    errors: [new BadInputError()],
  },
};
export const signInBySocialMock = {
  request: {
    query: SIGN_IN_BY_SOCIAL,
    variables: {
      social: socialProfile,
      profile: socialUserProfile,
    },
  },
  result: {
    data: {
      signInBySocial: tokens,
    },
  },
};
export const signInBySocialMockWithErrors = {
  ...signInBySocialMock,
  result: {
    errors: [new BadInputError()],
  },
};
export const signUpMock = {
  request: {
    query: SIGN_UP,
    variables: {
      form: signUpForm,
    },
  },
  result: {
    data: {
      signUp: tokens,
    },
  },
};
export const signUpCompletionMock = {
  request: {
    query: SIGN_UP_COMPLETION,
    variables: {
      form: signUpCompletionForm,
    },
  },
  result: {
    data: {
      signUpCompletion: tokens,
    },
  },
};
export const signUpCompletionMockWithErrors = {
  ...signUpCompletionMock,
  result: {
    errors: [new BadInputError()],
  },
};
export const signUpBySocialMock = {
  request: {
    query: SIGN_UP_BY_SOCIAL,
    variables: {
      social: socialProfile,
      profile: socialUserProfile,
    },
  },
  result: {
    data: {
      signUpBySocial: tokens,
    },
  },
};
export const signUpBySocialMockWithErrors = {
  ...signUpBySocialMock,
  result: {
    errors: [new BadInputError()],
  },
};
export const signUpAsyncValidationMock = {
  request: {
    query: SIGN_UP_ASYNC_VALIDATION,
    variables: {
      field: 'username',
      value: 'username',
    },
  },
  result: {
    data: {
      field: 'username',
      value: 'username',
    },
  },
};
export const checkSessionExpirationMock = {
  request: {
    query: CHECK_SESSION_EXPIRATION,
    variables: {},
  },
  result: {
    data: {
      sessionExpired: false,
    },
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
