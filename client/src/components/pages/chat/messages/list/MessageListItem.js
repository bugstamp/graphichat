import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';

import ListItemAvatar from '../../../../common/List/ListItemAvatar';
import SystemMessage from './SystemMessage';
import HistoryDivider from './HistoryDivider';

import { messageDateParsers } from '../../../../../helpers';
import { userAvatarProps } from '../../../../propTypes';

import {
  MessageListItemStyled,
  MessageWrapper,
  MessageInner,
  MessageContentWrapper,
  MessageContent,
  MessageTime,
  SpinnerWrapper,
} from './styled';

const ChatMessagesListItem = forwardRef((props, ref) => {
  const {
    avatar,
    rowIndex,
    alignItems,
    isFirst,
    isSystem,
    isMyMessage,
    isOptimistic,
    divider,
    time,
    content,
  } = props;
  const parsedTime = messageDateParsers.messageTime(time, 'wide');

  return (
    <MessageListItemStyled ref={ref} row-index={rowIndex} dense disableGutters>
      <MessageWrapper isMyMessage={isMyMessage} alignItems={alignItems}>
        <If condition={isFirst || divider}>
          <HistoryDivider time={time} />
        </If>
        <Choose>
          <When condition={isSystem}>
            <SystemMessage content={content} />
          </When>
          <Otherwise>
            <MessageInner>
              <Hidden mdUp>
                <ListItemAvatar {...avatar} />
              </Hidden>
              <MessageContentWrapper isOptimistic={isOptimistic}>
                <MessageContent>
                  <p>{content}</p>
                </MessageContent>
                <MessageTime>
                  <span>{parsedTime}</span>
                  <SpinnerWrapper>
                    <Spinner size={10} color="primary" />
                  </SpinnerWrapper>
                </MessageTime>
              </MessageContentWrapper>
            </MessageInner>
          </Otherwise>
        </Choose>
      </MessageWrapper>
    </MessageListItemStyled>
  );
});

ChatMessagesListItem.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  alignItems: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  avatar: PropTypes.shape(userAvatarProps).isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  divider: PropTypes.bool.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isMyMessage: PropTypes.bool.isRequired,
  isOptimistic: PropTypes.bool.isRequired,
};

export default memo(ChatMessagesListItem);
