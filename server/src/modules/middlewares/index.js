import { ForbiddenError } from '../../utils/apolloErrors';

import AuthProvider from '../auth/AuthProvider';

export const isAuth = () => next => async (parent, args, context, info) => {
  const { injector } = context;

  if (!injector.get(AuthProvider).getUser()) {
    throw new ForbiddenError();
  }
  return next(parent, args, context, info);
};

export default null;
