import { adopt } from 'react-adopt';

import { createMutation } from '../../apollo/utils';
import gql from '../../gql';

const { SIGN_IN, SIGN_IN_BY_SOCIAL } = gql;

const signIn = createMutation('signIn', SIGN_IN);
const signInBySocial = createMutation('signInBySocial', SIGN_IN_BY_SOCIAL);

const LoginContainer = adopt({
  signIn,
  signInBySocial,
});

export default LoginContainer;
