import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ResponsiveDialog = ({
  open,
  toggle,
  children,
  ...rest
}) => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const TransitionComponent = fullScreen ? Slide : Fade;
  const TransitionProps = fullScreen
    ? { direction: 'up' }
    : {};
  const PaperProps = {
    elevation: fullScreen ? 0 : 1,
  };

  return (
    <Dialog
      open={open}
      onClose={toggle}
      fullScreen={fullScreen}
      PaperProps={PaperProps}
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
      hideBackdrop={fullScreen}
      scroll="paper"
      {...rest}
    >
      {children}
    </Dialog>
  );
};

ResponsiveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
};

export default ResponsiveDialog;
