import { createError } from 'apollo-errors';

export const AuthenticationError = createError('AuthenticationError', {
  message: 'The user is not authorized',
});

export const BadInputError = createError('BadInputError', {
  message: 'The provided value is invalid',
});

export const ForbiddenError = createError('ForbiddenError', {
  message: 'Access is denied',
});

export const ServerError = createError('ServerError', {
  message: 'Server Error',
});

export class GraphQLErrors extends Error {
  constructor(graphQLErrors) {
    super();
    this.graphQLErrors = graphQLErrors;
    this.name = 'GraphQLErrors';
  }
}
