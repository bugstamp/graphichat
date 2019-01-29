import React, { Component } from 'react';
import styled from 'styled-components';
// import {} from 'polished';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

const NotificationMessageWrapper = styled.span`
  color: #fff;
`;

const NotificationMessage = ({ type, message }) => (
  <NotificationMessageWrapper>
    <Choose>
      <When condition={type === 'error'}>
        <ErrorIcon />
      </When>
      <When condition={type === 'warning'}>
        <WarningIcon />
      </When>
      <Otherwise>{null}</Otherwise>
    </Choose>
    {message}
  </NotificationMessageWrapper>
);

const NotificationClose = () => (
  <IconButton
    key="close"
    aria-label="Close"
    color="inherit"
  >
    <CloseIcon />
  </IconButton>
);

const NotificationContent = ({ type, message }) => (
  <SnackbarContent
    aria-describedby="alert-notification"
    message={<NotificationMessage />}
    action={[<NotificationClose />]}
  />
);

class Notification extends Component {
  state = {
    open: false,
  }

  render() {
    const { open } = this.state;
    const { type, message } = this.props;

    return (
      <Snackbar
        open={open}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        autoHideDuration={5000}
      >
        <NotificationContent type={type} message={message} />
      </Snackbar>
    );
  }
}

export default Notification;
