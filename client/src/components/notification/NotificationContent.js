import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SnackbarContent from '@material-ui/core/SnackbarContent';

import NotificationMessage from './NotificationMessage';
import NotificationClose from './NotificationClose';

import { getStyledProps } from '../../styles';

const SnackbarStyled = styled(SnackbarContent)`
  && {
    background-color: ${(props) => {
    const { type } = props;

    return getStyledProps(`theme.palette.${type}.main`)(props);
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
  type: PropTypes.oneOf(['warning', 'error', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationContent;
