import AuthProvider from './AuthProvider';

export default {
  Mutation: {
    signIn: (parent, { form }, { injector }) => injector.get(AuthProvider).signIn(form),
    signUp: (parent, { form }, { injector }) => injector.get(AuthProvider).signUp(form),
    signUpCompletion: (parent, { id, form }, { injector }) => injector
      .get(AuthProvider).signUpCompletion(id, form),
    signUpAsyncValidation: (parent, { field, value }, { injector }) => injector
      .get(AuthProvider).signUpAsyncValidation(field, value),
    signInBySocial: (parent, { social, profile }, { injector }) => injector
      .get(AuthProvider).signInBySocial(social, profile),
    signUpBySocial: (parent, { social, profile }, { injector }) => injector
      .get(AuthProvider).signUpBySocial(social, profile),
    signOut: (parent, { userId }, { injector }) => injector.get(AuthProvider).signOut(userId),
  },
};
