import db from '../db';
import { getHeaderTokens, setHeaderTokens } from '../helpers';

export default async (req, res, next) => {
  const { token, refreshToken } = getHeaderTokens(req);

  if (token) {
    try {
      const { user, newTokens } = await db.User.verifyTokens(token, refreshToken);

      if (newTokens) {
        res = setHeaderTokens(res, newTokens);
      }

      req.user = user;
    } catch (e) {
      console.log(e);
      req.user = undefined;
    }
  }
  next();
}
