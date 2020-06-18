import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  freezeResults: true,
  cacheRedirects: {
    Query: {
      chat(__root, { chatId }, { getCacheKey }) {
        return getCacheKey({ __typename: 'Chat', id: chatId });
      },
    },
  },
});

export const initialState = {
  sessionExpired: false,
  reconnection: 0,
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
