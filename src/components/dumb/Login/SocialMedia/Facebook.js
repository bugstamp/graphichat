import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import blue from '@material-ui/core/colors/blue';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import Social from './Social';
import SocialButton from './SocialButton';

const Facebook = ({ loading, mutation }) => (
  <Social social="facebook" color={blue[900]}>
    <FacebookLogin
      fields="id,email"
      appId={process.env.FACEBOOK_APP_ID}
      callback={({ userID, email }) => mutation({
        variables: {
          social: 'facebook',
          profile: {
            id: userID,
            email,
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
