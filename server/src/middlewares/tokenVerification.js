import db from '../db';
import { getHeaderTokens, setHeaderTokens } from '../utils/helpers';
// import {
//   AuthenticationError,
//   BadInputError,
// } from '../../utils/apolloErrors';

export default async (req, res, next) => {
  const tokens = getHeaderTokens(req);
  const { token, refreshToken } = tokens;

  if (token) {
    try {
      const { user, newTokens } = await db.User.verifyTokens(token, refreshToken);

      if (newTokens) {
        res = setHeaderTokens(res, newTokens);
      }

      req.user = user;
      next();
    } catch (e) {
      req.user = undefined;
      e.statusCode = 401;
      throw e;
    }
  } else {
    next();
  }
};
