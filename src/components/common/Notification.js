import React from 'react';
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

const NotificationMessageWrapper = styled.p`
  display: inline-flex;
  align-items: center;
  color: #fff;

  span {
    margin-left: 1em;
  }
`;

const NotificationContentWrapper = styled(SnackbarContent)`
  && {
    background-color: ${(props) => {
    const { type } = props;

    if (type === 'error') {
      return getStyledProps('theme.palette.error.main')(props);
    }
    return amber[500];
  }}}
`;

const NotificationMessage = ({ type, message }) => (
  <NotificationMessageWrapper>
    <NotificationMessageIcon type={type} />
    <span>
      {message}
    </span>
  </NotificationMessageWrapper>
);

const NotificationClose = ({ toggle }) => (
  <IconButton
    key="close"
    aria-label="Close"
    color="inherit"
    onClick={toggle}
  >
    <CloseIcon />
  </IconButton>
);

const NotificationContent = ({ type, message, toggle }) => (
  <NotificationContentWrapper
    type={type}
    aria-describedby="alert-notification"
    message={<NotificationMessage key="message" type={type} message={message} />}
    action={[<NotificationClose key="close" toggle={toggle} />]}
  />
);

const Notification = ({
  type,
  message,
  open,
  toggle,
  ...rest
}) => (
  <Snackbar
    open={open}
    onClose={(event, reason) => {
      if (reason === 'timeout' && !open) {
        return;
      }
      toggle();
    }}
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'top',
    }}
    autoHideDuration={4000}
    TransitionProps={{
      direction: 'left',
    }}
    {...rest}
  >
    <NotificationContent type={type} message={message} toggle={() => toggle()} />
  </Snackbar>
);

export default Notification;
