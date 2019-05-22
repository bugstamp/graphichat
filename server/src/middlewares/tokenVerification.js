import db from '../db';
import { getHeaderTokens, setHeaderTokens } from '../utils/helpers';

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
      res.status(401).send(e);
    }
  } else {
    next();
  }
};
