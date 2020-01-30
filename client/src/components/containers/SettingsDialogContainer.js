import { adopt } from 'react-adopt';

import queries from '../../queries';

const {
  user: {
    getMe,
    uploadAvatar,
    updateUser,
  },
} = queries;

const SettingsDialogContainer = adopt({
  getMe,
  uploadAvatar,
  updateUser,
});

export default SettingsDialogContainer;
