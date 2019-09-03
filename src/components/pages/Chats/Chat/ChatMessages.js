import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { includes, isEqual } from 'lodash';

import List from '../../../common/List';
import Message from './Message';

import { isSameDay } from '../../../../helpers';
import { userAvatarProps } from '../../../propTypes';

class ChatMessages extends Component {
  list = createRef();

  state = {
    listHeight: 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { listHeight } = this.state;

    if (!isEqual(listHeight, nextState.listHeight)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      chatId,
      adding,
      messages,
    } = this.props;

    if (!isEqual(prevProps.chatId, chatId)) {
      this.list.current.scrollToBottom();
    }

    if (
      isEqual(prevProps.chatId, chatId)
      &&
      !isEqual(prevProps.messages, messages)
    ) {
      if (!adding) {
        this.updateScrollTopAfterFetchMore();
      } else {
        this.list.current.scrollToBottom();
      }
    }
  }

  onResize = ({ height }) => {
    this.setState({ listHeight: height });
  }

  updateScrollTopAfterFetchMore = () => {
    const { listHeight } = this.state;
    const scrollTop = this.list.current.getScrollTop();
    const height = this.list.current.getListHeight();
    const diff = height - listHeight;

    if (scrollTop < diff) {
      const nextScrollTop = diff + scrollTop;

      this.list.current.setScrollTop(nextScrollTop);
    }
  }

  rowRenderer = ({
    ref,
    index,
    rowIndex,
    rowData,
  }) => {
    const {
      messages,
      optimisticIds,
      myId,
      avatars,
    } = this.props;
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
    const avatar = isMyMessage ? avatars.me : avatars.contact;
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
        fetchMoreThreshold={5}
        startFrom="bottom"
        rowRenderer={this.rowRenderer}
        onResize={this.onResize}
        lazyLoad
        scrollToBottomAfterMount
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
  avatars: PropTypes.shape({
    me: PropTypes.shape(userAvatarProps).isRequired,
    contact: PropTypes.shape(userAvatarProps).isRequired,
  }).isRequired,
};

export default ChatMessages;
