import { Injectable, ProviderScope } from '@graphql-modules/di';

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

  async onConnect() {
    if (this.user) {
      return {
        user: this.user,
      };
    }
  }

  getUser() {
    return this.user;
  }
}

export default AuthProvider;
