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

const FormSubmit = ({ loading, text }) => (
  <SubmitButton
    type="submit"
    size="large"
    color="primary"
    variant="contained"
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
