import { GraphQLDateTime } from 'graphql-iso-date';
import db from './db';

export default {
  Date: GraphQLDateTime,
  Query: {
    user: async (parent, { id }) => await db.User.findById(id),
    users: async () => await db.User.find(),
  },
  Mutation: {
    signIn: async (parent, { login, password }) => await db.User.find({ login, password }),
    signUp: async (parent, { form }) => await db.User.create(form),
  },
};
