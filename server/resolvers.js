import { GraphQLDateTime } from 'graphql-iso-date';
import db from './db';

export default {
  Date: GraphQLDateTime,
  Query: {
    user: async (parent, { id }) => await db.User.findById(id),
    users: async () => await db.User.find(),
  },
  Mutation: {
    signIn: db.User.signIn,
    signUp: db.User.signUp,
    singOut: db.User.singOut,
    delAccount: db.User.delAccount,
  },
};
