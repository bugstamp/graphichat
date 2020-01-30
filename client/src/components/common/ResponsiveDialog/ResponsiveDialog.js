import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TopProgressLine from '../TopProgressLine';

import { getStyledProps } from '../../../styles';

const ResponsiveDialogTitle = styled(DialogTitle)`
  && {
  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
  }
`;

const ResponsiveDialogContent = styled(DialogContent)`
  && {
    flex: 1 auto;
    display: flex;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
  }
`;

const ResponsiveDialog = ({
  open,
  toggle,
  title,
  subTitle,
  loading,
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
      disableEscapeKeyDown
      {...rest}
    >
      <TopProgressLine loading={loading} />
      <ResponsiveDialogTitle disableTypography>
        <Typography variant="h6">
          {title}
        </Typography>
        <If condition={subTitle}>
          <Typography variant="subtitle2">
            {subTitle}
          </Typography>
        </If>
      </ResponsiveDialogTitle>
      <ResponsiveDialogContent dividers>
        {children}
      </ResponsiveDialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ResponsiveDialog.defaultProps = {
  loading: false,
  subTitle: '',
};
ResponsiveDialog.propTypes = {
  loading: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
};

export default ResponsiveDialog;
