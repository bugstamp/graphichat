import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { position, rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { map, transform } from 'lodash';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';
import Button from '@material-ui/core/Button';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { getStyledProps, getPadding } from '../../styles';

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

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
  height: 100%;
  font-size: inherit;
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

const BrandIconContainer = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 3em;
`;

const BrandIconButton = styled(Fab)`
  && {
    color: #fff;
  }
`;

const BrandIcon = styled.div`
  display: inline-flex;

  :not(:last-child) {
    margin-right: 2em;
  }

  ${BrandIconButton} {
    background-color: ${({ brandColor }) => brandColor};

    :hover {
      background-color: ${({ brandColor }) => rgba(brandColor, 0.8)};
    }
  }
`;

const formConfig = {
  signin: [{
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'username or email',
    autocomplete: 'on',
    required: true,
    initial: '',
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '******',
    autocomplete: 'on',
    required: true,
    initial: '',
  }],
};

const formValidationSchemas = {
  signin: yup.object().shape(transform(formConfig.signin, (res, { name }) => {
    // eslint-disable-next-line
    switch (name) {
      case 'username': {
        res[name] = yup.string()
          .min(2)
          .max(20)
          .required('*required');
        break;
      }
      case 'password': {
        res[name] = yup.string()
          .min(6)
          .max(20)
          .required('*required');
        break;
      }
    }
  }), {}),
};

const formInitialValues = transform(formConfig, (form, val, key) => {
  form[key] = transform(val, (field, { name, initial }) => {
    field[name] = initial;
  }, {});
}, {});

const brandIcons = [
  {
    id: 'facebook',
    color: '#3232ff',
    iconElement: faFacebook,
  },
  {
    id: 'google',
    color: '#ff3232',
    iconElement: faGoogle,
  },
  {
    id: 'github',
    color: '#000',
    iconElement: faGithub,
  },
];

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };

    this.formId = 'signin';
    this.initialValues = formInitialValues[this.formId];
    this.formFields = formConfig[this.formId];
    this.formValidationSchema = formValidationSchemas[this.formId];
  }

  toggleShowPassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  render() {
    const { showPassword } = this.state;

    return (
      <Mutation mutation={SIGN_IN}>
        {(signIn, { data }) => {
          console.log(data);
          return (
            <Wrapper elevation={8}>
              <Title
                color="primary"
                variant="h3"
                align="center"
                gutterBottom
              >
                <AccountIconWrapper>
                  <AccountCircleIcon fontSize="inherit" color="primary" />
                </AccountIconWrapper>
                {'Sign In'}
              </Title>
              <Formik
                initialValues={this.initialValues}
                validationSchema={this.formValidationSchema}
                onSubmit={({ username, password }, actions) => {
                  signIn({ variables: { username, password }});
                }}
                render={({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => {
                  return (
                    <Form onSubmit={(event) => { event.preventDefault(); }}>
                      {
                        map(this.formFields, ({
                          name,
                          label,
                          type,
                          placeholder,
                          autocomplete,
                          required,
                        }) => {
                          const isError = errors[name] && touched[name];
                          const isPasswordField = type === 'password';
                          const error = errors[name];
                          const verifiedType = (isPasswordField && showPassword)
                            ? 'text'
                            : type;

                          return (
                            <TextField key={name} fullWidth>
                              <InputLabel htmlFor={name}>{label}</InputLabel>
                              <Input
                                id={name}
                                type={verifiedType}
                                value={values[name]}
                                error={errors[name] && touched[name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={placeholder}
                                required={required}
                                autoComplete={autocomplete}
                                endAdornment={(
                                  <Choose>
                                    <When condition={isPasswordField}>
                                      <InputAdornment position="end">
                                        <IconButton onClick={this.toggleShowPassword}>
                                          <Choose>
                                            <When condition={showPassword}>
                                              <VisibilityIcon />
                                            </When>
                                            <Otherwise>
                                              <VisibilityOffIcon />
                                            </Otherwise>
                                          </Choose>
                                        </IconButton>
                                      </InputAdornment>
                                    </When>
                                    <Otherwise>{null}</Otherwise>
                                  </Choose>
                                )}
                              />
                              <If condition={isError}>
                                <FormHelperText error={isError}>{error}</FormHelperText>
                              </If>
                            </TextField>
                          );
                        })
                      }
                      <SubmitButton
                        color="primary"
                        size="large"
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                      >
                        {'Sign In'}
                      </SubmitButton>
                      <SignUpButton
                        color="primary"
                        size="large"
                        variant="outlined"
                        fullWidth
                      >
                        {'Sign Up'}
                      </SignUpButton>
                      <BrandIconContainer>
                        {
                          map(brandIcons, ({ id, color, iconElement }) => (
                            <BrandIcon
                              key={id}
                              brand={id}
                              brandColor={color}
                            >
                              <BrandIconButton size="large">
                                <FontAwesomeIcon icon={iconElement} size="lg" />
                              </BrandIconButton>
                            </BrandIcon>
                          ))
                        }
                      </BrandIconContainer>
                    </Form>
                  );
                }}
              />
            </Wrapper>
          )
        }}
      </Mutation>
    );
  }
}

export default LoginForm;
