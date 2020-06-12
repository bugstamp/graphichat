import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Zoom from '@material-ui/core/Zoom';

import ListItemAvatar from '../../../../common/List/ListItemAvatar';
import ListItemInfo from '../../../../common/List/ListItemInfo';

import { ListItem, SecondaryInfo, Time } from './styled';

const Contact = (props) => {
  const {
    chatId,
    displayName,
    message,
    avatar,
    online,
    time,
    isSelected,
    onSelect,
  } = props;
  const { src, text } = avatar;

  return (
    <Zoom in>
      <ListItem isSelected={isSelected} onClick={e => onSelect(chatId, e)}>
        <ListItemAvatar src={src} text={text} online={online} />
        <ListItemInfo primary={displayName} secondary={message} />
        <SecondaryInfo>
          <Time>{time}</Time>
        </SecondaryInfo>
      </ListItem>
    </Zoom>
  );
};

Contact.propTypes = {
  chatId: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  online: PropTypes.bool.isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(Contact);
