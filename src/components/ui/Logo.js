import React from 'react';
import styled from 'styled-components';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';

import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const Wrapper = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 35px;
  margin-bottom: 100%;
`;

const Icon = styled(({ above, ...rest }) => <ChatBubbleIcon {...rest} />)`
  && {
    color: ${({ above }) => (above ? blue[500] : indigo[500])};
    opacity: ${({ above }) => (above ? 1 : 0.5)};

    ${({ above }) => above && `
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-40%);
    `}
  }
`;

const Logo = () => (
  <Wrapper>
    <Icon fontSize="inherit" above />
    <Icon fontSize="inherit" />
  </Wrapper>
);

export default Logo;
