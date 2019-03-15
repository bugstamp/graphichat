// import {} from 'lodash';

const createTokenMethods = name => ({
  name,
  set(token) {
    localStorage.setItem(this.name, token);
  },
  get() {
    return localStorage.getItem(this.name) || null;
  },
  remove() {
    localStorage.removeItem(this.name);
  },
});

export default {
  token: createTokenMethods('chatkilla_tkn'),
  refreshToken: createTokenMethods('chatkilla_rfrsh_tkn'),
  setTokens(token, refreshToken) {
    this.token.set(token);
    this.refreshToken.set(refreshToken);
  },
  getTokens() {
    const token = this.token.get();
    const refreshToken = this.refreshToken.get();

    return { token, refreshToken };
  },
  removeTokens() {
    this.token.remove();
    this.refreshToken.remove();
  },
};
