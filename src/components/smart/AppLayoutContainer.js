import { adopt } from 'react-adopt';

import { createMutation, createQuery } from '../../apollo/utils';
import { GET_ME, SIGN_OUT } from '../../actions/authActions';

const getMe = createQuery('getMe', GET_ME);
const signOut = createMutation('signOut', SIGN_OUT);

const AppLayoutContainer = adopt({
  getMe,
  signOut,
});

export default AppLayoutContainer;
