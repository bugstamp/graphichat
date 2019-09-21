import { Injectable, ProviderScope } from '@graphql-modules/di';

import db, { connectToDb } from '../../db';

@Injectable({
  scope: ProviderScope.Session,
})
class DbProvider {
  static db = db;

  // eslint-disable-next-line
  async onInit() {
    try {
      await connectToDb();
      console.log('Connected to db');
    } catch (e) {
      console.log('Couldn\'t connected to db', e);
    }
  }
}

export default DbProvider;
