export const getHeaderTokens = (req) => {
  const token = req.headers['x-token'];
  const refreshToken = req.headers['x-refresh-token'];

  return { token, refreshToken };
};

export const setHeaderTokens = (res, { token, refreshToken }) => {
  res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
  res.set('x-token', token);
  res.set('x-refresh-token', refreshToken);

  return res;
};
