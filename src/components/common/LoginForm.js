import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { map } from 'lodash';
import { position, rgba } from 'polished';

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

const BrandIconsWrapper = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 3em;
`;

const BrandIconElement = styled.div`
  display: inline-flex;

  :not(:last-child) {
    margin-right: 2em;
  }

  :nth-child(2) {
    align-self: flex-end;
  }

  button {
    color: #fff;
    background-color: ${({ brandColor }) => brandColor};

    :hover {
      background-color: ${({ brandColor }) => rgba(brandColor, 0.7)};
    }
  }
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

const brandIcons = [
  {
    id: 'facebook',
    color: 'blue',
    iconElement: faFacebook,
  },
  {
    id: 'google',
    color: 'red',
    iconElement: faGoogle,
  },
  {
    id: 'github',
    color: 'black',
    iconElement: faGithub,
  },
];

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
      <Wrapper brandColor="piska" elevation={8}>
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
              const verifiedType = (isPasswordField && showPassword)
                ? 'text'
                : type;

              return (
                <TextField
                  key={id}
                  required={required}
                  fullWidth
                >
                  <InputLabel htmlFor={id}>{label}</InputLabel>
                  <Input
                    id={id}
                    type={verifiedType}
                    placeholder={placeholder}
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
          <BrandIconsWrapper>
            {
              map(brandIcons, ({ id, color, iconElement }) => (
                <BrandIconElement
                  key={id}
                  brand={id}
                  brandColor={color}
                >
                  <Fab size="large">
                    <FontAwesomeIcon icon={iconElement} size="lg" />
                  </Fab>
                </BrandIconElement>
              ))
            }
          </BrandIconsWrapper>
        </Form>
      </Wrapper>
    );
  }
}

export default LoginForm;
