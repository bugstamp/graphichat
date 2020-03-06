import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import BrandTitle from './BrandTitle';
import { LoginPresentationWrapper, SubTitle } from './styled';

const LoginPresentation = ({ stopAnimation, toggleForm }) => (
  <LoginPresentationWrapper>
    <BrandTitle />
    <SubTitle stopAnimation={stopAnimation}>
      <Typography component="p" variant="h4" align="center" paragraph>
        A lightweight, simple and useful web chat app based on the modern GraphQL API
      </Typography>
      <button type="button" onClick={toggleForm}>
        <Typography component="p" variant="h4" align="center">Try it now!</Typography>
      </button>
    </SubTitle>
  </LoginPresentationWrapper>
);

LoginPresentation.propTypes = {
  stopAnimation: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default memo(LoginPresentation);
