import React, {
  memo,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ResponsiveDialog from '../common/ResponsiveDialog';
import TopProgressLine from '../common/TopProgressLine';
import Settings from './Settings';

import { SettingsDialogContent } from './styled';

const SettingsDialog = (props) => {
  const { open, toggle } = props;
  const [mode, setMode] = useState('read');
  const [loading, setLoading] = useState(false);
  const buttonText = mode === 'edit' ? 'Cancel' : 'Edit';

  const handleToggleMode = useCallback(() => {
    setMode(mode === 'read' ? 'edit' : 'read');
  }, [mode]);

  const handleToggle = useCallback(() => {
    if (mode === 'edit') {
      toggle();
      handleToggleMode();
    } else {
      toggle();
    }
  }, [mode, toggle, handleToggleMode]);

  return (
    <ResponsiveDialog
      open={open}
      toggle={handleToggle}
    >
      <TopProgressLine loading={loading} />
      <DialogTitle disableTypography>
        <Typography variant="h6">Settings</Typography>
      </DialogTitle>
      <SettingsDialogContent dividers>
        <Settings
          mode={mode}
          setMode={setMode}
          setLoading={setLoading}
        />
      </SettingsDialogContent>
      <DialogActions>
        <Button
          onClick={handleToggleMode}
          color="primary"
          type="button"
          variant="contained"
        >
          {buttonText}
        </Button>
        <Button
          onClick={handleToggle}
          color="primary"
          type="button"
        >
          Close
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
