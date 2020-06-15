import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

NotificationClose.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default NotificationClose;
