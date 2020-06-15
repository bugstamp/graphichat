import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ResponsiveDialog from '../common/ResponsiveDialog';
import TopProgressLine from '../common/TopProgressLine';
import Settings from './Settings';

const SettingsDialog = (props) => {
  const { open, toggle } = props;
  const [mode, setMode] = useState('read');
  const [loading, setLoading] = useState(false);
  const buttonText = mode === 'edit' ? 'Cancel' : 'Edit';

  const handleToggleMode = useCallback(() => {
    setMode(mode === 'read' ? 'edit' : 'read');
  }, [mode]);

  return (
    <ResponsiveDialog
      open={open}
      toggle={toggle}
    >
      <TopProgressLine loading={loading} />
      <DialogTitle disableTypography>
        <Typography variant="h6">Settings</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Settings
          mode={mode}
          setMode={setMode}
          setLoading={setLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={toggle}
          color="primary"
          type="button"
        >
          Close
        </Button>
        <Button
          onClick={handleToggleMode}
          color="primary"
          type="button"
          variant="contained"
        >
          {buttonText}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default memo(SettingsDialog);
