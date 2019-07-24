import React from 'react';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import green from '@material-ui/core/colors/green';

import { getStyledProps } from '../../../../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${getStyledProps('theme.palette.grey.300')};
  z-index: 20;
`;

const MessagePanelTopBarName = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  p {
    ${getStyledProps('theme.typography.subtitle2')};
  }
`;

const MessagePanelTopBarStatus = styled.span`
  ${getStyledProps('theme.typography.caption')};
  color: ${({ online, ...rest }) => (online
    ? green[600]
    : getStyledProps('theme.palette.grey.500')(rest))};
`;

const MessagePanelTopBar = ({ name, statusText, isOnline }) => (
  <Wrapper>
    <IconButton>
      <SearchIcon />
    </IconButton>
    <MessagePanelTopBarName>
      <p>{name}</p>
      <MessagePanelTopBarStatus online={isOnline}>
        {statusText}
      </MessagePanelTopBarStatus>
    </MessagePanelTopBarName>
    <IconButton>
      <SettingsIcon />
    </IconButton>
  </Wrapper>
);

export default MessagePanelTopBar;
