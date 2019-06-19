import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  freezeResults: true,
});

const initialState = {
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
