import { upperFirst } from 'lodash';

export const getHeaderTokens = (req) => {
  const token = req.headers['x-token'];
  const refreshToken = req.headers['x-refresh-token'];

  return { token, refreshToken };
};

export const setHeaderTokens = (res, { token, refreshToken }) => {
  // res.set('Access-Control-Expose-Headers', '*');
  res.set({
    'x-token': token,
    'x-refresh-token': refreshToken,
  });

  return res;
};

export const removeHeaderTokens = (res) => {
  res.set({
    'x-token': null,
    'x-refresh-token': null,
  });

  return res;
};

export const getUserDisplayName = ({ firstName, lastName }) => `${upperFirst(firstName)} ${upperFirst(lastName)}`;
