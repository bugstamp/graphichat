import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';

import NotificationContent from './NotificationContent';

class Notification extends Component {
  onClose = (event, reason) => {
    const { open, toggle } = this.props;

    if (reason === 'timeout' && !open) {
      return;
    }
    toggle();
  }

  render() {
    const {
      type,
      message,
      open,
      toggle,
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
          toggle={() => toggle()}
        />
      </Snackbar>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Notification;
