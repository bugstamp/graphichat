import React, {
  memo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormInput from './FormInput';

import { mutationResultProps } from '../../propTypes';

const AsyncFormInput = (props) => {
  const {
    result: { loading, data, error },
    ...rest
  } = props;
  const [asyncValid, setAsyncValid] = useState(false);

  const handleSetAsyncValid = useCallback((asyncValidState) => {
    setAsyncValid(asyncValidState);
  }, []);

  useEffect(() => {
    if (data) {
      handleSetAsyncValid(true);
    }
    if (error) {
      handleSetAsyncValid(false);
    }
  }, [data, error, handleSetAsyncValid]);

  return (
    <FormInput
      {...rest}
      endAdornment={
        (loading || asyncValid)
        && (
          <InputAdornment position="end">
            <Choose>
              <When condition={loading}>
                <CircularProgress size={18} />
              </When>
              <When condition={!loading && asyncValid}>
                <CheckIcon color="action" />
              </When>
              <Otherwise>{null}</Otherwise>
            </Choose>
          </InputAdornment>
        )
      }
    />
  );
};

AsyncFormInput.propTypes = {
  result: PropTypes.shape(mutationResultProps).isRequired,
};

export default memo(AsyncFormInput);
