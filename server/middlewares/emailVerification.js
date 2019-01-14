import db from '../db';
import { setHeaderTokens } from '../helpers';

export default async function (reg, res) {
  const { regToken } = reg.params;

  try {
    const tokens = await db.User.verifySignUp(regToken);

    res = setHeaderTokens(res, tokens);
    res.redirect('/');
  } catch (err) {
    res.sendStatus(404);
  }
}
