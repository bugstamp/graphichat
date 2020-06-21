import React, { useCallback, useContext } from 'react';
// import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';

import NotificationContent from './NotificationContent';
import { NotificationContext } from '../context/NotificationProvider';

const Notification = (props) => {
  const [state, setState] = useContext(NotificationContext);
  const {
    type,
    message,
    open,
  } = state;

  const onClose = useCallback((event, reason) => {
    if (reason === 'timeout' && !state.open) {
      return;
    }
    setState({ ...state, open: false });
  }, [state, setState]);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      TransitionProps={{
        direction: 'left',
      }}
      autoHideDuration={20000}
      {...props}
    >
      <NotificationContent
        type={type}
        message={message}
        onClose={onClose}
      />
    </Snackbar>
  );
};

Notification.propTypes = {};

export default Notification;
