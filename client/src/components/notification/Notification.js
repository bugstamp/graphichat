import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';

import NotificationContent from './NotificationContent';

class Notification extends PureComponent {
  onClose = (event, reason) => {
    const { open, close } = this.props;

    if (reason === 'timeout' && !open) {
      return;
    }
    close();
  }

  render() {
    const {
      type,
      message,
      open,
      ...rest
    } = this.props;

    return (
      <Snackbar
        open={open}
        onClose={this.onClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        TransitionProps={{
          direction: 'left',
        }}
        autoHideDuration={4000}
        {...rest}
      >
        <NotificationContent
          type={type}
          message={message}
          onClose={this.onClose}
        />
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Notification;
