import express from 'express';

import db from '../db';
import { setHeaderTokens } from '../helpers';

const router = express.Router();

router.get('/api/verification/:regToken', async (reg, res) => {
  const { regToken } = reg.params;

  try {
    const tokens = await db.User.verifySignUp(regToken);

    res = setHeaderTokens(res, tokens);
    res.redirect('/');
  } catch (err) {
    res.status(404).send('Verification token was expired');
  }
});

export default router;
