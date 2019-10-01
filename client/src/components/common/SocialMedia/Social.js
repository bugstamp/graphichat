import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Button } from './SocialButton';

const SocialWrapper = styled.div`
  display: inline-flex;

  :not(:last-child) {
    margin-right: 1em;
  }

  ${Button} {
    background-color: ${({ color }) => color};

    :hover {
      background-color: ${({ color }) => rgba(color, 0.8)};
    }
  }
`;

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
