import { ForbiddenError } from '../../utils/apolloErrors';

export const isAuth = () => next => async (parent, args, context, info) => {
  if (!context.user) {
    throw new ForbiddenError();
  }
  return next(parent, args, context, info);
};

export default null;
