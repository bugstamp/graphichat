import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { position, rgba } from 'polished';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

// import Notification from './Notification';

import { getStyledProps, getPadding } from '../../styles';

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

const SIGN_IN_BY_SOCIAL = gql`
  mutation SignInBySocial($social: String!, $profile: SocialProfile!) {
    signInBySocial(social: $social, profile: $profile) {
      token
      refreshToken
    }
  }
`;

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    max-width: 375px;
    min-width: 320px;
    padding: ${getPadding(5)} ${getPadding(3)};
  }
`;

const Title = styled(Typography)`
  width: 100%;
  position: relative;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
`;

const TextField = styled(FormControl)`
  && {
    margin-bottom: 1em;
  }
`;

const CircularProgressIcon = styled(CircularProgress)`
  display: block;
`;

const SubmitButtonWrapper = styled.div`
  position: relative;
  margin-top: 1em;
`;

const BrandIconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
    label: 'User name / Email',
    type: 'text',
    autocomplete: 'on',
    required: true,
    initial: '',
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
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
        res[name] = yup.string().required('*required');
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

  signInConfirmed = ({ token, refreshToken }) => {
    const { history } = this.props;

    localStorage.setItem('chatkilla_tkn', token);
    localStorage.setItem('chatkilla_rfrsh_tkn', refreshToken);

    history.push('/');
  }

  signUp = () => {
    const { history } = this.props;

    history.push('/login/new');
  }

  socialSignInResponse = (social, response) => {
    console.log(social);
    console.log(response);
  }

  render() {
    const { showPassword } = this.state;

    return (
      <Mutation
        mutation={SIGN_IN}
        update={(cache, { data: { signIn } }) => {
          this.signInConfirmed(signIn);
        }}
      >
        {(signIn, { loading }) => {
          return (
            <Wrapper elevation={8}>
              <Title variant="h1" color="primary" align="center">
                <AccountCircleIcon fontSize="inherit" color="primary" />
              </Title>
              <Formik
                initialValues={this.initialValues}
                validationSchema={this.formValidationSchema}
                onSubmit={({ username, password }) => {
                  signIn({ variables: { username, password } });
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
                      <SubmitButtonWrapper>
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={loading}
                          fullWidth
                        >
                          <Choose>
                            <When condition={loading}>
                              <CircularProgress size={26} />
                            </When>
                            <Otherwise>
                              {'Sign In'}
                            </Otherwise>
                          </Choose>
                        </Button>
                      </SubmitButtonWrapper>
                      <SubmitButtonWrapper>
                        <Button
                          onClick={this.signUp}
                          color="primary"
                          size="large"
                          variant="outlined"
                          fullWidth
                        >
                          {'Sign Up'}
                        </Button>
                      </SubmitButtonWrapper>
                      <Mutation
                        mutation={SIGN_IN_BY_SOCIAL}
                        update={(cache, { data: { signInBySocial } }) => {
                          this.signInConfirmed(signInBySocial);
                        }}
                      >
                        {(signInBySocial, { loading: socialLoading }) => (
                          <BrandIconContainer>
                            {
                              map(brandIcons, ({ id, color, iconElement }) => (
                                <BrandIcon
                                  key={id}
                                  brand={id}
                                  brandColor={color}
                                >
                                  <Choose>
                                    <When condition={id === 'google'}>
                                      <GoogleLogin
                                        scope="email profile"
                                        clientId={process.env.GOOGLE_APP_ID}
                                        onSuccess={({ profileObj: { googleId, email } }) => signInBySocial({
                                          variables: {
                                            social: id,
                                            profile: {
                                              id: googleId,
                                              email,
                                            },
                                          },
                                        })}
                                        render={({ onClick, isProcessing }) => (
                                          <BrandIconButton disabled={isProcessing || socialLoading} size="large" onClick={onClick}>
                                            <FontAwesomeIcon icon={iconElement} size="lg" />
                                          </BrandIconButton>
                                        )}
                                      />
                                    </When>
                                    <When condition={id === 'facebook'}>
                                      <FacebookLogin
                                        fields="id,email"
                                        appId={process.env.FACEBOOK_APP_ID}
                                        callback={({ userID, email }) => signInBySocial({
                                          variables: {
                                            social: id,
                                            profile: {
                                              id: userID,
                                              email,
                                            },
                                          },
                                        })}
                                        render={({ onClick, isProcessing }) => (
                                          <BrandIconButton disabled={isProcessing || socialLoading} size="large" onClick={onClick}>
                                            <FontAwesomeIcon icon={iconElement} size="lg" />
                                          </BrandIconButton>
                                        )}
                                      />
                                    </When>
                                    <Otherwise>
                                      {null}
                                    </Otherwise>
                                  </Choose>
                                </BrandIcon>
                              ))
                            }
                          </BrandIconContainer>
                        )}
                      </Mutation>
                    </Form>
                  );
                }}
              />
              {/* <Notification open={!!error} type="warning" /> */}
            </Wrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
