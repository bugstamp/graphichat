import React, { memo } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';

import { messageDateParsers } from '../../../../../helpers';

import { ChatTopbarStyled, UserName, UserStatus } from './styled';

const ChatTopbar = (props) => {
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
    <ChatTopbarStyled>
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
    </ChatTopbarStyled>
  );
};

ChatTopbar.defaultProps = {
  lastDate: '',
};
ChatTopbar.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lastDate: PropTypes.string,
};

export default memo(ChatTopbar);
