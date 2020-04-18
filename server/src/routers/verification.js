import express from 'express';

import db from '../db';

const router = express.Router();

router.get('/api/verification/:regToken', async (reg, res) => {
  const { regToken } = reg.params;

  try {
    const id = await db.User.verifyEmail(regToken);
    const redirectPath = `/reg?id=${id}`;
    const redirectUrl = process.env.NODE_ENV !== 'production'
      ? `${process.env.DEV_URL}${redirectPath}`
      : redirectPath;

    res.redirect(redirectUrl);
  } catch (err) {
    res.status(404).send('Verification token was expired');
  }
});

export default router;
