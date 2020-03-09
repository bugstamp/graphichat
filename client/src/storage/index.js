import config from 'config';
import jwt from 'jsonwebtoken';

const { tokenSecrets } = config;

export function Storage(tokenName, refreshTokenName) {
  const createTokenMethods = name => ({
    name,
    set(token) {
      localStorage.setItem(this.name, token);
      return true;
    },
    get() {
      return localStorage.getItem(this.name) || '';
    },
    remove() {
      localStorage.removeItem(this.name);
      return true;
    },
  });

  this.token = createTokenMethods(tokenName);
  this.refreshToken = createTokenMethods(refreshTokenName);
  this.setTokens = (token, refreshToken) => {
    this.token.set(token);
    this.refreshToken.set(refreshToken);

    return true;
  };
  this.getTokens = () => {
    const token = this.token.get();
    const refreshToken = this.refreshToken.get();

    return { token, refreshToken };
  };
  this.removeTokens = () => {
    this.token.remove();
    this.refreshToken.remove();

    return true;
  };
}

const storage = new Storage(config.tokenName, config.refreshTokenName);

export const checkToken = (token, set = false) => {
  try {
    if (!token) {
      throw new Error('Token wasn\'t found');
    }
    const secret = tokenSecrets.token;
    const { data } = jwt.verify(token, secret);

    if (set) {
      storage.token.set(token);
    }
    return data;
  } catch (e) {
    return {};
  }
};

export default storage;
