import { adopt } from 'react-adopt';

import queries from '../../queries';

const {
  auth: {
    checkSessionExpiration,
    signOut,
  },
  user: {
    getInitialData,
    userUpdateSubscription,
    userActivitySubscription,
  },
  chat: {
    chatCreatedSubscription,
  },
} = queries;

const AppLayoutContainer = adopt({
  checkSessionExpiration,
  getInitialData,
  signOut,
  userUpdateSubscription,
  userActivitySubscription,
  chatCreatedSubscription,
});

export default AppLayoutContainer;
