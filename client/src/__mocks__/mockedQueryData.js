export const avatar = {
  sm: '',
  md: '',
  __typename: 'UserAvatar',
};

export const uploadAvatar = {
  ...avatar,
  sm: 'smAvatar',
  md: 'mdAvatar',
};

export const me = {
  id: 1,
  avatar,
  username: 'me',
  displayName: 'Me Test',
  firstName: 'Me',
  lastName: 'Test',
  status: 'ONLINE',
  lastDate: Date.now(),
  __typename: 'User',
};

export const user = {
  id: 2,
  avatar,
  username: 'user',
  displayName: 'User Test',
  firstName: 'User',
  lastName: 'Test',
  status: 'OFFLINE',
  lastDate: Date.now(),
  __typename: 'User',
};

export const userActivityUpdate = {
  userId: 2,
  status: 'ONLINE',
  lastDate: Date.now(),
};

export const contact = {
  id: 11,
  chatId: 1,
  userInfo: user,
};

export const message = {
  id: 1,
  senderId: 1,
  type: 'text',
  content: 'yo!',
  time: Date.now(),
  edited: false,
  seen: false,
};

export const chat = {
  id: 1,
  messages: [message],
};
