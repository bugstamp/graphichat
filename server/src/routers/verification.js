import express from 'express';

import db from '../db';
import { setHeaderTokens } from '../helpers';

const router = express.Router();

router.get('/verification/:regToken', async (reg, res) => {
  const { regToken } = reg.params;

  try {
    const tokens = await db.User.verifySignUp(regToken);

    res = setHeaderTokens(res, tokens);
    res.redirect('/');
  } catch (err) {
    res.sendStatus(404);
  }
});

export default router;
