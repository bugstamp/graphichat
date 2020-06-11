import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import List from '../../../common/List';
import Message from './Message';

import { isSameDay } from '../../../../helpers';
import { userAvatarProps } from '../../../propTypes';

const ChatMessages = (props) => {
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
      <Message
        ref={ref}
        rowIndex={rowIndex}
        content={content}
        avatar={avatar}
        time={time}
        isSystem={isSystem}
        isFirst={isFirst}
        isMyMessage={isMyMessage}
        divider={divider}
        alignItems={alignItems}
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

ChatMessages.defaultProps = {
  chatId: null,
  myId: null,
  messages: [],
};
ChatMessages.propTypes = {
  chatId: PropTypes.string,
  myId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  adding: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  getMessages: PropTypes.func.isRequired,
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
};

export default ChatMessages;
