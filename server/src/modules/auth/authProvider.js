import { Injectable, ProviderScope } from '@graphql-modules/di';

import db from '../../db';

@Injectable({
  scope: ProviderScope.Session,
})
class AuthProvider {
  user = null

  onRequest({ session }) {
    if (session.req) {
      this.user = session.req.user;
    }
  }

  async onConnect({ tokens: { token } }) {
    if (token) {
      try {
        const { data } = await db.User.verifyToken(token, 'token');

        this.user = data;
      } catch (e) {
        throw e;
      }
    }
    throw new Error('User is unauthorized');
  }

  getMe() {
    return this.user;
  }
}

export default AuthProvider;
