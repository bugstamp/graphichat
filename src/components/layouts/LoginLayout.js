import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import LayoutWrapper from './LayoutWrapper';

const LoginLayout = ({ children }) => (
  <LayoutWrapper>
    {children}
  </LayoutWrapper>
);

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(LoginLayout);
