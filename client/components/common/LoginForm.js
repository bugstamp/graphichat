import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircleRounded';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { map } from 'lodash';
import { position } from 'polished';

import { getStyledProps, getPadding } from '../../styles';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    max-width: 450px;
    min-width: 375px;
    padding: ${getPadding(5)} ${getPadding(3)};
  }
`;

const Title = styled(Typography)`
  width: 100%;
  position: relative;
`;

const AccountIconWrapper = styled.div`
${position('absolute', '0', null, null, '20%')}
  height: ${getStyledProps('theme.typography.h3.fontSize')};
  font-size: ${getStyledProps('theme.typography.h3.fontSize')};
`;

const Form = styled.form`
  width: 100%;
`;

const TextField = styled(FormControl)`
  && {
    margin-bottom: 1em;
  }
`;

const SubmitButton = styled(Button)`
  && {
    margin-top: 1em;
  }
`;

const SignUpButton = styled(Button)`
  && {
    margin-top: 1em;
  }
`;

const BrandIconsWrapper = styled.div`
  width: 100%;
`;

const formFields = {
  login: [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Username or email',
      autocomplete: 'on',
      required: true,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '******',
      autocomplete: 'on',
      required: true,
    },
  ],
};

class LoginForm extends Component {
  state = {
    showPassword: false,
  }

  toggleShowPassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  render() {
    const { showPassword } = this.state;

    return (
      <Wrapper elevation={8}>
        <Title
          color="primary"
          variant="h3"
          align="center"
          gutterBottom
        >
          <AccountIconWrapper>
            <AccountCircle fontSize="inherit" color="primary" />
          </AccountIconWrapper>
          {'Log In'}
        </Title>
        <Form onSubmit={(event) => { event.preventDefault(); }}>
          {
            map(formFields.login, ({
              id,
              label,
              type,
              placeholder,
              autocomplete,
              required,
            }) => {
              const isPasswordField = type === 'password';
              const getType = () => {
                if (isPasswordField && showPassword) {
                  return 'text';
                }
                return type;
              };

              return (
                <TextField
                  key={id}
                  required={required}
                  fullWidth
                >
                  <InputLabel htmlFor={id}>{label}</InputLabel>
                  <Input
                    id={id}
                    type={getType()}
                    placeholder={placeholder}
                    autoComplete={autocomplete}
                    endAdornment={(
                      <Choose>
                        <When condition={isPasswordField}>
                          <InputAdornment position="end">
                            <IconButton onClick={this.toggleShowPassword}>
                              <Choose>
                                <When condition={showPassword}>
                                  <Visibility />
                                </When>
                                <Otherwise>
                                  <VisibilityOff />
                                </Otherwise>
                              </Choose>
                            </IconButton>
                          </InputAdornment>
                        </When>
                        <Otherwise>{null}</Otherwise>
                      </Choose>
                    )}
                  />
                </TextField>
              );
            })
          }
          <SubmitButton
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Log In
          </SubmitButton>
          <SignUpButton
            color="primary"
            size="large"
            variant="outlined"
            fullWidth
          >
            Sign Up
          </SignUpButton>
          <BrandIconsWrapper>
          </BrandIconsWrapper>
        </Form>
      </Wrapper>
    );
  }
}

export default LoginForm;
