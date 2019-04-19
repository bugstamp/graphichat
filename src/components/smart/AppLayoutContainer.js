import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { GET_ME } from '../../actions/authActions';

// const signIn = createMutation('signIn', SIGN_IN);
// const signInBySocial = createMutation('signInBySocial', SIGN_IN_BY_SOCIAL);
const getMe = createQuery('getMe', GET_ME);

const AppLayoutContainer = adopt({
  getMe,
});

export default AppLayoutContainer;
