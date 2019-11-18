export const createTokenMethods = name => ({
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

export function Storage(tokenName, refreshTokenName) {
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

const storage = new Storage('chatkilla_tkn', 'chatkilla_rfrsh_tkn');

export default storage;
