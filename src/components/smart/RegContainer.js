import { adopt } from 'react-adopt';

import {
  SIGN_UP_ASYNC_VALIDATION,
  SIGN_UP,
  SIGN_UP_COMPLETION,
  SIGN_UP_BY_SOCIAL,
} from '../../actions/authActions';
import { createMutation } from '../../apollo/utils';

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
