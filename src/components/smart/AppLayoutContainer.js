import React from 'react';
import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';

// import { createMutation } from '../../apollo/utils';
import { GET_ME } from '../../actions/authActions';

// const signIn = createMutation('signIn', SIGN_IN);
// const signInBySocial = createMutation('signInBySocial', SIGN_IN_BY_SOCIAL);

const AppLayoutContainer = adopt({
  getMe: <Query query={GET_ME} />,
});

export default AppLayoutContainer;
