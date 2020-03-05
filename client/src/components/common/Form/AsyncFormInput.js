import React, {
  memo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import AsyncFormInputAdornment from './AsyncFormInputAdornment';

import { mutationResultProps } from '../../propTypes';

const AsyncFormInput = (props) => {
  const {
    result: { loading, data, error },
    ...rest
  } = props;
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (data) {
      setValid(true);
    }
    if (error) {
      setValid(false);
    }
  }, [data, error]);

  return (
    <FormInput
      {...rest}
      endAdornment={(<AsyncFormInputAdornment loading={loading} isSuccess={valid} />)}
    />
  );
};

AsyncFormInput.propTypes = {
  result: PropTypes.shape(mutationResultProps).isRequired,
};

export default memo(AsyncFormInput);
