import { combineResolvers } from 'apollo-resolvers';

import customScalars from './customScalars';
import userResolvers from './userResolvers';

export default combineResolvers([
  customScalars,
  userResolvers,
]);
