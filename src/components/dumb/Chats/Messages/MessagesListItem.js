import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';

import ListItem from '@material-ui/core/ListItem';

import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import { getStyledProps, getSpacing } from '../../../../styles';
import { messageTimeParser, messageHistoryDateParser } from '../../../../helpers';

const MessagePanelListItem = styled(ListItem)`
  && {
    padding-top: ${getSpacing(1)};
    padding-bottom: ${getSpacing(1)};
  }
`;

const MessagePanelListItemMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: ${({ alignItems }) => alignItems};
`;

const MessagePanelHistoryDivider = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${getSpacing(1)} 0;

  p {
    height: 1px;
    flex: 1 auto;
    display: inline-flex;
    background-color: ${grey[500]};
    border-radius: 2px;
  }

  span {
    padding: 0 ${getSpacing(2)};
    color: ${grey[500]};
  }
`;

const MessagePanelMessage = styled.div`
  max-width: 49%;
  padding: ${getSpacing(1)};
  ${({ isMyMessage }) => ({
    [`border-bottom-${isMyMessage ? 'left' : 'right'}-radius`]: 0,
  })};
  background-color: ${({ isMyMessage }) => (isMyMessage ? grey[100] : blue[100])};
  border-radius: 5px;
  opacity: ${({ isAdding }) => (isAdding ? 0.3 : 1)};
  word-break: break-all;
  ${getStyledProps('theme.typography.body2')};

  &:hover {
    cursor: text;
  }
`;

const MessagePanelSystemMessage = styled.div`
  padding: ${getSpacing(1)};
  color: ${grey[500]};
  background-color: ${grey[100]};
  border-radius: 10px;
`;

const MessagePanelMessageTime = styled.div`
  display: flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
`;

const MessagesListItem = forwardRef((props, ref) => {
  const {
    rowIndex,
    alignItems,
    isFirst,
    isSystem,
    isMyMessage,
    isAdding,
    divider,
    time,
    content,
  } = props;

  return (
    <MessagePanelListItem ref={ref} row-index={rowIndex}>
      <MessagePanelListItemMessageWrapper alignItems={alignItems}>
        <If condition={isFirst || divider}>
          <MessagePanelHistoryDivider>
            <p />
            <span>{messageHistoryDateParser(time)}</span>
            <p />
          </MessagePanelHistoryDivider>
        </If>
        <Choose>
          <When condition={isSystem}>
            <MessagePanelSystemMessage>
              <p>{content}</p>
            </MessagePanelSystemMessage>
          </When>
          <Otherwise>
            <MessagePanelMessage
              isMyMessage={isMyMessage}
              isAdding={isAdding}
            >
              {content}
            </MessagePanelMessage>
            <MessagePanelMessageTime>
              <span>{messageTimeParser(time, 'wide')}</span>
            </MessagePanelMessageTime>
          </Otherwise>
        </Choose>
      </MessagePanelListItemMessageWrapper>
    </MessagePanelListItem>
  );
});

MessagesListItem.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  alignItems: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isSystem: PropTypes.bool.isRequired,
  isMyMessage: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  divider: PropTypes.bool.isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  content: PropTypes.string.isRequired,
};

export default MessagesListItem;
