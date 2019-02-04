import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import {} from 'polished';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import amber from '@material-ui/core/colors/amber';

import { getStyledProps } from '../../styles';

const NotificationMessageWrapper = styled.span`
  color: #fff;
  background-color: ${(props) => {
    const { type } = props;

    if (type === 'error') {
      return getStyledProps('theme.palette.error.dark')(props);
    }
    return amber[500];
  }}
`;

const NotificationMessageIcon = ({ type }) => (
  <Choose>
    <When condition={type === 'error'}>
      <ErrorIcon />
    </When>
    <When condition={type === 'warning'}>
      <WarningIcon />
    </When>
    <Otherwise>{null}</Otherwise>
  </Choose>
);

const NotificationMessage = ({ type, message }) => (
  <NotificationMessageWrapper type={type}>
    <NotificationMessageIcon type={type} />
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
    message={<NotificationMessage type={type} message={message} />}
    action={[<NotificationClose />]}
  />
);

class Notification extends PureComponent {
  state = {
    // open: false,
  }

  render() {
    const { type, message, open } = this.props;

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
