import config from 'config';
import jwt from 'jsonwebtoken';

import storage, { checkToken } from './index';

const { tokenSecrets } = config;

const mockToken = {
  data: {
    regStatus: 'COMPLETED',
  },
};

describe('test storage', () => {
  it('test set/get methods', () => {
    expect(storage.token.set('token')).toEqual(true);
    expect(storage.refreshToken.set('refreshToken')).toEqual(true);
    expect(storage.token.get()).toEqual('token');
    expect(storage.refreshToken.get()).toEqual('refreshToken');
  });

  it('test remove methods', () => {
    expect(storage.token.remove()).toEqual(true);
    expect(storage.refreshToken.remove()).toEqual(true);
    expect(storage.token.get()).toEqual('');
    expect(storage.refreshToken.get()).toEqual('');
  });

  it('test storage methods', () => {
    expect(storage.setTokens('token', 'refreshToken')).toEqual(true);
    expect(storage.getTokens()).toMatchObject({
      token: 'token',
      refreshToken: 'refreshToken',
    });
    expect(storage.removeTokens('token', 'refreshToken')).toEqual(true);
    expect(storage.getTokens()).toMatchObject({
      token: '',
      refreshToken: '',
    });
  });
});

describe('test checkToken', () => {
  const token = jwt.sign(mockToken, tokenSecrets.token);

  afterAll(() => {
    storage.removeTokens();
  });

  it('if token doesn\'t exist', () => {
    expect(checkToken()).toMatchObject({ regStatus: '' });
  });

  it('verify token', () => {
    expect(checkToken(token)).toMatchObject({ regStatus: 'COMPLETED' });
    expect(storage.token.get()).toEqual('');
  });

  it('verify and set token', () => {
    expect(checkToken(token, true)).toMatchObject({ regStatus: 'COMPLETED' });
    expect(storage.token.get()).toEqual(token);
  });
});
