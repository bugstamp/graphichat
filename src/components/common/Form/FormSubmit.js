import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const SubmitButton = styled(Button)`
  && {
    position: relative;
    margin-top: 1em;
  }
`;

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
