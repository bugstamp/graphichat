import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { includes, isEqual } from 'lodash';

import List from './List';
import MessageListItem from './MessageListItem';

import { isSameDay } from '../../../helpers';

class MessagePanelMessages extends Component {
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
      loading,
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
    const scrollTop = this.list.getScrollTop();
    const height = this.list.getListHeight();
    const diff = height - listHeight;

    if (scrollTop < diff) {
      const nextScrollTop = diff + scrollTop;

      this.list.setScrollTop(nextScrollTop);
    }
  }

  rowRenderer = ({
    ref,
    index,
    rowIndex,
    rowData,
  }) => {
    const { messages, optimisticIds, myId } = this.props;
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
    let divider = false;

    if (index > 0) {
      const { time: prevMessageTime } = messages[index - 1];

      divider = !isSameDay(time, prevMessageTime);
    }

    return (
      <MessageListItem
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
        fetchMoreThreshold={10}
        startFrom="bottom"
        onResize={this.onResize}
        lazyLoad
      />
    );
  }
}

MessagePanelMessages.defaultProps = {};
MessagePanelMessages.propTypes = {};

export default MessagePanelMessages;
