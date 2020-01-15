import { adopt } from 'react-adopt';

import queries from '../../queries';

const {
  auth: {
    checkSessionExpiration,
    signOut,
  },
  user: {
    getInitialData,
    uploadAvatar,
    updateUser,
    userUpdateSubscription,
    userActivitySubscription,
  },
  chat: {
    chatCreatedSubscription,
  },
} = queries;

const AppLayoutContainer = adopt({
  chatCreatedSubscription,
  getInitialData,
  uploadAvatar,
  updateUser,
  userActivitySubscription,
  userUpdateSubscription,
  checkSessionExpiration,
  signOut,
});

export default AppLayoutContainer;
