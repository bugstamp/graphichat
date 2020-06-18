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

  const close = useCallback(() => {
    setState({
      ...state,
      open: false,
    });
  }, [state]);

  const open = useCallback((message = '', type = 'error') => {
    setState({
      open: true,
      message,
      type,
    });
  }, []);


  return (
    <NotificationContext.Provider value={open}>
      {children}
      <Notification {...state} close={close} />
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default NotificationProvider;
