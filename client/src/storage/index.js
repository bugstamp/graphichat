import config from 'config';

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

export default storage;
