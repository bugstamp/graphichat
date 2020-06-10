import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChatIcon from '@material-ui/icons/ChatBubbleRounded';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const LogoStyled = styled.div`
  position: relative;
  height: ${({ size }) => `${size}px`};
  font-size: ${({ size }) => `${size}px`};
`;

const Icon = styled(({ top, ...rest }) => <ChatIcon {...rest} />)`
  && {
    color: ${({ top }) => (top ? blue[500] : indigo[800])};
    opacity: ${({ top }) => (top ? 1 : 0.5)};

    ${({ top }) => top && `
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-60%);
    `}
  }
`;

const Logo = ({ size }) => (
  <LogoStyled size={size}>
    <Icon fontSize="inherit" top />
    <Icon fontSize="inherit" />
  </LogoStyled>
);

Logo.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Logo;
