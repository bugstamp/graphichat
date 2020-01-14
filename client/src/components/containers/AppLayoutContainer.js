import { adopt } from 'react-adopt';

import queries from '../../queries';

const {
  user: {
    checkSessionExpiration,
    getInitialData,
    uploadAvatar,
    updateUser,
    userUpdateSubscription,
    userActivitySubscription,
    signOut,
  },
  chat: {
    chatCreatedSubscription,
  },
} = queries;

const AppLayoutContainer = adopt({
  chatCreatedSubscription,
  userActivitySubscription,
  getInitialData,
  checkSessionExpiration,
  signOut,
  uploadAvatar,
  userUpdateSubscription,
  updateUser,
});

export default AppLayoutContainer;
