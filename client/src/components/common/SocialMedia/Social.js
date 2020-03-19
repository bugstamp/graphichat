import React from 'react';
import PropTypes from 'prop-types';

import { SocialWrapper } from './styled';

const Social = ({ social, color, children }) => (
  <SocialWrapper
    key={social}
    color={color}
  >
    {children}
  </SocialWrapper>
);

Social.propTypes = {
  social: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default Social;
