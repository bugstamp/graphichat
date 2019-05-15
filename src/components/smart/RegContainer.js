import { adopt } from 'react-adopt';

import gql from '../../gql';
import { createMutation } from '../../apollo/utils';

const {
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
} = gql;

const signUpAsyncValidationUsername = createMutation('signUpAsyncValidationUsername', SIGN_UP_ASYNC_VALIDATION);
const signUpAsyncValidationEmail = createMutation('signUpAsyncValidationEmail', SIGN_UP_ASYNC_VALIDATION);
const signUp = createMutation('signUp', SIGN_UP);
const signUpCompletion = createMutation('signUpCompletion', SIGN_UP_COMPLETION);
const signUpBySocial = createMutation('signUpBySocial', SIGN_UP_BY_SOCIAL);

const RegContainer = adopt({
  signUpAsyncValidationUsername,
  signUpAsyncValidationEmail,
  signUp,
  signUpCompletion,
  signUpBySocial,
});

export default RegContainer;
