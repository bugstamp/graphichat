import React from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import { rgba } from 'polished';

import { getStyledProps } from '../../styles';

const Container = styled(Paper)`
  && {
    width: 450px;
    padding: ${(props) => {
      const defaultPadding = getStyledProps('theme.spacing.unit')(props);
      const padding = defaultPadding * 2;

      return `${padding}px`;
    }};
    background: ${rgba('#ffffff', 0.5)}
  }
`;

const Header = styled(Typography)`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
`;

const FormField = styled(FormControl)`
  width: 100%;
`;

const renderField = ({}) => (
  <FormField>
    <InputLabel />
    <Input />
  </FormField>
);

const LoginForm = () => (
  <Container elevation={8}>
    <Header
      variant="h4"
      align="center"
      gutterBottom
    >
      {'Login In'}
    </Header>
    <Form onSubmit={(event) => { event.preventDefault(); }}>
      <Field component={renderField} />
    </Form>
  </Container>
);

export default reduxForm({ form: 'loginForm' })(LoginForm);
