import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const NotificationClose = ({ onClose }) => (
  <IconButton
    key="close"
    aria-label="Close"
    color="inherit"
    onClick={() => onClose()}
  >
    <CloseIcon />
  </IconButton>
);

NotificationClose.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationClose;
