import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';

import NotificationMessage from './NotificationMessage';
import NotificationClose from './NotificationClose';

import { getStyledProps } from '../../styles';

const SnackbarStyled = styled(SnackbarContent)`
  && {
    background-color: ${(props) => {
    const { type } = props;

    if (type === 'error') {
      return getStyledProps('theme.palette.error.main')(props);
    }
    return amber[500];
  }}}
`;

const NotificationContent = ({ type, message, onClose }) => (
  <SnackbarStyled
    type={type}
    aria-describedby="alert-notification"
    message={<NotificationMessage key="message" type={type} message={message} />}
    action={[<NotificationClose key="close" onClose={onClose} />]}
  />
);

NotificationContent.propTypes = {
  type: PropTypes.oneOf(['warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationContent;
