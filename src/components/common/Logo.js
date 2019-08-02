import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const Wrapper = styled.div`
  position: relative;
  height: ${({ fontSize }) => `${fontSize}px`};
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

const Icon = styled(({ top, ...rest }) => <ChatBubbleIcon {...rest} />)`
  && {
    color: ${({ top }) => (top ? blue[500] : indigo[500])};
    opacity: ${({ top }) => (top ? 1 : 0.5)};

    ${({ top }) => top && `
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-60%);
    `}
  }
`;

const Logo = ({ fontSize }) => (
  <Wrapper fontSize={fontSize}>
    <Icon fontSize="inherit" top />
    <Icon fontSize="inherit" />
  </Wrapper>
);

Logo.defaultProps = {
  fontSize: 35,
};

Logo.propTypes = {
  fontSize: PropTypes.number,
};

export default Logo;
