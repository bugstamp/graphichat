import client from './index';
import storage from '../storage';

export const forceLogout = () => {
  client.writeData({ data: { sessionExpired: true } });
  storage.removeTokens();
};
