import React from 'react';
// import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {} from 'polished';

const Form = styled.form`
  width: 100%;
`;

const LoginForm = () => (
  <Paper>
    <Typography
      variant="h3"
      align="center"
      gutterBottom
    >
      {'Auth'}
    </Typography>
    <Form onSubmit={(event) => { event.preventDefault(); }}>
      {'Form'}
    </Form>
  </Paper>
);

export default LoginForm;
