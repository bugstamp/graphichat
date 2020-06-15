import React, {
  createContext,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Notification from '../notification';

export const NotificationContext = createContext(null);

const NotificationProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState({
    open: false,
    message: '',
    type: 'error',
  });
  const { open } = state;

  const toggleNotification = useCallback((message = '', type = 'error') => {
    setState({
      open: !open,
      message,
      type,
    });
  }, [open]);

  return (
    <NotificationContext.Provider value={toggleNotification}>
      {children}
      <Notification {...state} toggle={toggleNotification} />
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default NotificationProvider;
