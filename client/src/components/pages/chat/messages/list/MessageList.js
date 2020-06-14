import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import List from '../../../../common/List';
import MessageListItem from './MessageListItem';

import { isSameDay } from '../../../../../helpers';
import { userAvatarProps } from '../../../../propTypes';

const MessageList = (props) => {
  const {
    myId,
    chatId,
    loading,
    adding,
    messages,
    myAvatar,
    contactAvatar,
    getMessages,
  } = props;
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current.scrollToBottom();
  }, []);

  useEffect(() => {
    listRef.current.scrollToBottom();
  }, [chatId]);

  useEffect(() => {
    if (adding) {
      listRef.current.scrollToBottom();
    }
  }, [messages, adding]);

  const rowRenderer = useCallback((args) => {
    const {
      ref,
      index,
      rowIndex,
      rowData,
    } = args;
    const {
      id,
      senderId,
      type,
      time,
      content,
      isOptimistic,
    } = rowData;
    const isSystem = type === 'system';
    const isFirst = messages[0].id === id;
    const isMyMessage = senderId === myId;
    const direction = isMyMessage ? 'start' : 'end';
    const alignItems = isSystem ? 'center' : `flex-${direction}`;
    const avatar = isMyMessage ? myAvatar : contactAvatar;
    let divider = false;

    if (index > 0) {
      const { time: prevMessageTime } = messages[index - 1];

      divider = !isSameDay(time, prevMessageTime);
    }

    return (
      <MessageListItem
        ref={ref}
        rowIndex={rowIndex}
        id={id}
        alignItems={alignItems}
        content={content}
        avatar={avatar}
        time={time}
        divider={divider}
        isSystem={isSystem}
        isFirst={isFirst}
        isMyMessage={isMyMessage}
        isOptimistic={isOptimistic}
      />
    );
  }, [myId, messages, myAvatar, contactAvatar]);

  return (
    <List
      ref={listRef}
      loading={loading}
      data={messages}
      fetchMore={getMessages}
      fetchMoreThreshold={1}
      startFrom="bottom"
      rowRenderer={rowRenderer}
      lazyLoad
      dense
    />
  );
};

MessageList.defaultProps = {
  chatId: null,
  myId: null,
  messages: [],
};
MessageList.propTypes = {
  chatId: PropTypes.string,
  myId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  adding: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  getMessages: PropTypes.func.isRequired,
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
};

export default MessageList;
