import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import red from '@material-ui/core/colors/red';

import Social from './Social';
import SocialButton from './SocialButton';

const Google = ({ loading, mutation }) => (
  <Social social="google" color={red[500]}>
    <GoogleLogin
      scope="email profile"
      clientId={process.env.GOOGLE_APP_ID}
      onSuccess={({
        profileObj: {
          googleId: id,
          email,
          givenName: firstName,
          familyName: lastName,
        },
      }) => mutation({
        variables: {
          social: {
            id,
            name: 'google',
          },
          profile: {
            email,
            firstName,
            lastName,
          },
        },
      })}
      render={({ onClick }) => (
        <SocialButton loading={loading} onClick={onClick} icon={faGoogle} />
      )}
    />
  </Social>
);

Google.propTypes = {
  loading: PropTypes.bool.isRequired,
  mutation: PropTypes.func.isRequired,
};

export default Google;
