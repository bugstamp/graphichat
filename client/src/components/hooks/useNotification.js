import { useContext } from 'react';

import { NotificationContext } from '../context/NotificationProvider';

const useNotification = () => {
  const toggleNotification = useContext(NotificationContext);

  return toggleNotification;
};

export default useNotification;
