import React from 'react';
import PropTypes from 'prop-types';

import { SubmitButton } from './styled';

const FormSubmit = ({ loading, text }) => (
  <SubmitButton
    type="submit"
    size="large"
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
};
FormSubmit.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default FormSubmit;
