import React from 'react';
import PropTypes from 'prop-types';

import { SubmitButton } from './styled';

const FormSubmit = ({ loading, text, size }) => (
  <SubmitButton
    type="submit"
    size={size}
    color="primary"
    variant="contained"
    disabled={loading}
    fullWidth
  >
    {text}
  </SubmitButton>
);

FormSubmit.defaultProps = {
  loading: false,
  size: 'large',
};
FormSubmit.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default FormSubmit;
