import React from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

const AsyncFormInputAdornment = ({ loading, isSuccess }) => {
  if (!loading && !isSuccess) {
    return null;
  }
  return (
    <InputAdornment position="end">
      <Choose>
        <When condition={loading}>
          <CircularProgress size={18} />
        </When>
        <When condition={!loading && isSuccess}>
          <CheckIcon color="action" />
        </When>
        <Otherwise>{null}</Otherwise>
      </Choose>
    </InputAdornment>
  );
};

AsyncFormInputAdornment.defaultProps = {
  loading: false,
  isSuccess: false,
};
AsyncFormInputAdornment.propTypes = {
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

export default AsyncFormInputAdornment;
