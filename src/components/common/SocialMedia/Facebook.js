import React from 'react';
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
        // eslint-disable-next-line
        userID: id,
        email,
        first_name: firstName,
        last_name: lastName,
        gender,
      }) => mutation({
        variables: {
          social: 'facebook',
          profile: {
            id,
            email,
            firstName,
            lastName,
            gender,
          },
        },
      })}
      render={({ onClick }) => (
        <SocialButton loading={loading} onClick={onClick} icon={faFacebook} />
      )}
    />
  </Social>
);

export default Facebook;
