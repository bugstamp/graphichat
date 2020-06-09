import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { includes, isEqual } from 'lodash';

import List from '../../../common/List';
import Message from './Message';

import { isSameDay } from '../../../../helpers';
import { userAvatarProps } from '../../../propTypes';

class ChatMessages extends Component {
  list = createRef();

  componentDidMount() {
    this.list.current.scrollToBottom();
  }

  getSnapshotBeforeUpdate(nextProps) {
    const { chatId, adding, messages } = this.props;

    if (!isEqual(nextProps.chatId, chatId)) {
      return true;
    }

    if (!isEqual(nextProps.messages.length, messages.length)) {
      if (adding) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState, shouldScrollToBottom) {
    if (shouldScrollToBottom) {
      this.list.current.scrollToBottom();
    }
  }

  rowRenderer = (props) => {
    const {
      messages,
      optimisticIds,
      myId,
      myAvatar,
      contactAvatar,
    } = this.props;
    const {
      ref,
      index,
      rowIndex,
      rowData,
    } = props;
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
    const isAdding = includes(optimisticIds, id);
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
        alignItems={alignItems}
        divider={divider}
        time={time}
        content={content}
        isSystem={isSystem}
        isFirst={isFirst}
        isMyMessage={isMyMessage}
        isAdding={isAdding}
        avatar={avatar}
      />
    );
  }

  render() {
    const {
      loading,
      messages,
      getMessages,
    } = this.props;

    return (
      <List
        ref={this.list}
        loading={loading}
        data={messages}
        fetchMore={getMessages}
        fetchMoreThreshold={1}
        startFrom="bottom"
        rowRenderer={this.rowRenderer}
        onResize={this.onResize}
        lazyLoad
      />
    );
  }
}

ChatMessages.defaultProps = {
  chatId: null,
  myId: null,
  messages: [],
  optimisticIds: [],
};
ChatMessages.propTypes = {
  chatId: PropTypes.string,
  myId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  adding: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object),
  getMessages: PropTypes.func.isRequired,
  optimisticIds: PropTypes.arrayOf(PropTypes.string),
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
};

export default ChatMessages;
