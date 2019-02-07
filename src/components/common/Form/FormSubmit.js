import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const SubmitButton = styled(Button)`
  && {
    position: relative;
    margin-top: 1em;
  }
`;

const FormSubmit = ({ onClick, loading, text }) => (
  <SubmitButton
    color="primary"
    size="large"
    variant="contained"
    onClick={onClick}
    disabled={loading}
    fullWidth
  >
    <Choose>
      <When condition={loading}>
        <CircularProgress size={26} />
      </When>
      <Otherwise>
        {text}
      </Otherwise>
    </Choose>
  </SubmitButton>
);

export default FormSubmit;
