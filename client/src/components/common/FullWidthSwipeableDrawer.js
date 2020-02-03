import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const FullWidthSwipeableDrawerStyled = styled(SwipeableDrawer)`
  && {
    > * {
      width: 100%;
    }
  }
`;

const FullWidthSwipeableDrawer = ({
  children,
  open,
  onClose,
  onOpen,
  anchor,
  variant,
  elevation,
  disableSwipeToOpen,
}) => (
  <FullWidthSwipeableDrawerStyled
    open={open}
    onOpen={onOpen}
    onClose={onClose}
    anchor={anchor}
    variant={variant}
    elevation={elevation}
    disableSwipeToOpen={disableSwipeToOpen}
    disableBackdropTransition
    disableDiscovery
  >
    {children}
  </FullWidthSwipeableDrawerStyled>
);

FullWidthSwipeableDrawer.defaultProps = {
  children: null,
  onOpen: () => null,
  anchor: 'right',
  variant: 'temporary',
  elevation: 0,
  disableSwipeToOpen: false,
};
FullWidthSwipeableDrawer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  anchor: PropTypes.string,
  variant: PropTypes.string,
  elevation: PropTypes.number,
  disableSwipeToOpen: PropTypes.bool,
};

export default FullWidthSwipeableDrawer;
