import db from '../db';
import { getHeaderTokens, setHeaderTokens, removeHeaderTokens } from '../helpers';

export default async (req, res, next) => {
  const tokens = getHeaderTokens(req);
  const { token, refreshToken } = tokens;

  if (token) {
    try {
      const { user, newTokens } = await db.User.verifyTokens(token, refreshToken);

      if (newTokens) {
        res = setHeaderTokens(res, newTokens);
      } else {
        res = removeHeaderTokens(res);
      }

      req.user = user;
    } catch (e) {
      req.user = undefined;
    }
  }
  next();
};
