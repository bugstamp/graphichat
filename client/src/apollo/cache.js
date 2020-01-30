import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export const initialState = {
  sessionExpired: false,
  me: {
    __typename: 'User',
  },
  myContacts: [],
  myChats: [],
};

export const initData = () => {
  cache.writeData({ data: initialState });
};
initData();

export default cache;
