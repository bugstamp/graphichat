import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import green from '@material-ui/core/colors/green';

import { messageDateParsers } from '../../../../helpers';
import { getStyledProps, getSpacing } from '../../../../styles';

const ChatTopBarStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${getSpacing(1)};
  background-color: #fff;
  border-bottom: 1px solid ${getStyledProps('theme.palette.grey.200')};
  z-index: 20;
`;

const UserName = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  p {
    ${getStyledProps('theme.typography.subtitle2')};
  }
`;

const UserStatus = styled.span`
  ${getStyledProps('theme.typography.caption')};
  color: ${({ online, ...rest }) => (online
    ? green[600]
    : getStyledProps('theme.palette.grey.500')(rest))};
`;

const ChatTopBar = (props) => {
  const {
    name,
    status,
    lastDate,
  } = props;
  const isOnline = status === 'ONLINE';
  const statusText = (isOnline && lastDate)
    ? 'online'
    : messageDateParsers.userLastDate(lastDate);

  return (
    <ChatTopBarStyled>
      <IconButton size="small">
        <SearchIcon />
      </IconButton>
      <UserName>
        <p>{name}</p>
        <UserStatus online={isOnline}>
          {statusText}
        </UserStatus>
      </UserName>
      <IconButton size="small">
        <SettingsIcon />
      </IconButton>
    </ChatTopBarStyled>
  );
};

ChatTopBar.defaultProps = {
  lastDate: '',
};
ChatTopBar.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lastDate: PropTypes.string,
};

export default memo(ChatTopBar);
