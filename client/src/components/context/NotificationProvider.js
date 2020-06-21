import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const NotificationContext = createContext(null);

const NotificationProvider = (props) => {
  const { children } = props;
  const state = useState({
    open: false,
    message: '',
    type: 'error',
  });

  return (
    <NotificationContext.Provider value={state}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default NotificationProvider;
