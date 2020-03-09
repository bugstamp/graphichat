export const avatar = {
  sm: '',
  md: '',
  __typename: 'UserAvatar',
};

export const updateUserResult = {
  field: 'username',
  value: 'user',
  __typename: 'UserUpdateForm',
};

export const uploadAvatar = {
  ...avatar,
  sm: 'smAvatar',
  md: 'mdAvatar',
};

export const me = {
  id: '1',
  avatar,
  username: 'me',
  displayName: 'Me Test',
  firstName: 'Me',
  lastName: 'Test',
  status: 'ONLINE',
  __typename: 'User',
};

export const user = {
  id: '2',
  avatar,
  username: 'user',
  displayName: 'User Test',
  firstName: 'User',
  lastName: 'Test',
  status: 'OFFLINE',
  lastDate: new Date(1990, 0, 0, 0, 0, 0, 0, 0),
  __typename: 'User',
};

export const userActivityUpdate = {
  userId: '2',
  status: 'ONLINE',
  lastDate: new Date(1990, 0, 0, 0, 0, 0, 0, 0),
  __typename: 'UserActivityUpdate',
};

export const contact = {
  id: '11',
  chatId: 1,
  userInfo: user,
  __typename: 'MyContact',
};

export const message = {
  id: '1',
  senderId: '1',
  type: 'text',
  content: 'yo!',
  time: '',
  edited: false,
  seen: false,
  __typename: 'ChatMessage',
};

export const chat = {
  id: '1',
  messages: [message],
  __typename: 'Chat',
};

export const tokens = {
  token: 'token',
  refreshToken: 'refreshToken',
};

export const signInForm = {
  username: 'test',
  password: 123456,
  __typename: 'SignInForm',
};

export const signUpForm = {
  username: 'test',
  email: 'test@gmail.com',
  password: 123456,
  __typename: 'SignUpForm',
};

export const socialProfile = {
  id: 123456,
  name: 'google',
  __typename: 'SocialProfile',
};

export const socialUserProfile = {
  email: 'test@gmail.com',
  firstName: 'test',
  lastName: 'test',
  __typename: 'SocialUserProfile',
};
