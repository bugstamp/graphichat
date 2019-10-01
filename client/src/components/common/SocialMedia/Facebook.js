import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import blue from '@material-ui/core/colors/blue';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import Social from './Social';
import SocialButton from './SocialButton';

const Facebook = ({ loading, mutation }) => (
  <Social social="facebook" color={blue[900]}>
    <FacebookLogin
      fields="first_name,last_name,id,email,gender"
      appId={process.env.FACEBOOK_APP_ID}
      callback={({
        userID: id,
        email,
        first_name: firstName,
        last_name: lastName,
      }) => mutation({
        variables: {
          social: {
            id,
            name: 'facebook',
          },
          profile: {
            email,
            firstName,
            lastName,
          },
        },
      })}
      render={({ onClick }) => (
        <SocialButton
          loading={loading}
          onClick={onClick}
          icon={faFacebook}
        />
      )}
    />
  </Social>
);

Facebook.propTypes = {
  loading: PropTypes.bool.isRequired,
  mutation: PropTypes.func.isRequired,
};

export default Facebook;
