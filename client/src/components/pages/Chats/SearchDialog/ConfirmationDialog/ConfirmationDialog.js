import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmationDialog = (props) => {
  const {
    isOpen,
    toggle,
    displayName,
    toggleConfirmDialog,
    onConfirm,
  } = props;

  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle>{`Create chat with ${displayName}?`}</DialogTitle>
      <DialogActions>
        <Button
          color="primary"
          size="small"
          onClick={toggleConfirmDialog}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = {
  displayName: '',
};
ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  displayName: PropTypes.string,
  toggleConfirmDialog: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
