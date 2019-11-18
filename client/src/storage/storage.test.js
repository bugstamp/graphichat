import { Storage } from './index';

const mockStorage = new Storage('testToken', 'testRefreshToken');

describe('test storage', () => {
  test('test set/get methods', () => {
    expect(mockStorage.token.set('token')).toEqual(true);
    expect(mockStorage.refreshToken.set('refreshToken')).toEqual(true);
    expect(mockStorage.token.get()).toEqual('token');
    expect(mockStorage.refreshToken.get()).toEqual('refreshToken');
  });

  test('test remove methods', () => {
    expect(mockStorage.token.remove()).toEqual(true);
    expect(mockStorage.refreshToken.remove()).toEqual(true);
    expect(mockStorage.token.get()).toEqual('');
    expect(mockStorage.refreshToken.get()).toEqual('');
  });

  test('test storage methods', () => {
    expect(mockStorage.setTokens('token', 'refreshToken')).toEqual(true);
    expect(mockStorage.getTokens()).toMatchObject({
      token: 'token',
      refreshToken: 'refreshToken',
    });
    expect(mockStorage.removeTokens('token', 'refreshToken')).toEqual(true);
    expect(mockStorage.getTokens()).toMatchObject({
      token: '',
      refreshToken: '',
    });
  });
});
