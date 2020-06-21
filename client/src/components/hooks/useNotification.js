import { useContext, useCallback } from 'react';

import { NotificationContext } from '../context/NotificationProvider';

const useNotification = () => {
  const [, setState] = useContext(NotificationContext);

  const toggleNotification = useCallback((message, type = 'error') => {
    setState({
      open: true,
      message,
      type,
    });
  }, [setState]);

  return toggleNotification;
};

export default useNotification;
