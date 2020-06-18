import client from './index';
import storage from '../storage';

import gql from '../gql';

const { RECONNECTION } = gql;

export const sessionExpired = () => {
  client.writeData({ data: { sessionExpired: true } });
  storage.removeTokens();
};

export const updateReconnection = (isReconnecting) => {
  const count = client.readQuery({ query: RECONNECTION });
  const nextCount = isReconnecting ? count + 1 : 0;
  client.writeData({ data: { reconnection: nextCount } });
};
