import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import uuid from 'uuid/v4';

import Paper from '@material-ui/core/Paper';

import ChatTopBar from './ChatTopBar';
import ChatMessages from './ChatMessages';
import ChatComment from './ChatComment';

import { getSpacing } from '../../../../styles';
import { getAvatar, userLastDateParser } from '../../../../helpers';
import { meProps, userInfoProps, chatProps } from '../../../propTypes';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} 0;
    background-color: #fff;
  }
`;

class Chat extends Component {
  fetchSize = 30;

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate(prevProps) {
    const { chat: { id: chatId } } = this.props;

    if (!isEqual(prevProps.chat.id, chatId)) {
      this.getMessages();
    }
  }

  getMessages = (fetchMore = false) => {
    const { chat } = this.props;
    const { id: chatId, messages } = chat;
    const skip = messages.length;

    if (!fetchMore) {
      if (skip < this.fetchSize) {
        this.fetchMoreMessages({ chatId, skip });
      }
    } else {
      this.fetchMoreMessages({ chatId, skip });
    }
  }

  addMessage = (content) => {
    const {
      me: { id: myId },
      chat: { id: chatId },
      updateOptimisticIds,
      addMessage,
      getAddMessageOptimisticResponse,
    } = this.props;
    const time = new Date();
    const optimisticId = uuid();

    const variables = {
      chatId,
      content,
      time,
      optimisticId,
    };
    const optimisticResponse = getAddMessageOptimisticResponse({
      chatId,
      optimisticId,
      myId,
      content,
      time,
    });

    addMessage({ variables, optimisticResponse });
    updateOptimisticIds(optimisticId);
  }

  fetchMoreMessages = (variables) => {
    const {
      fetchMoreMessages,
      fetchMoreMessagesUpdate,
    } = this.props;

    fetchMoreMessages(fetchMoreMessagesUpdate(variables));
  };

  render() {
    const {
      loading,
      adding,
      me,
      userInfo,
      chat,
      optimisticIds,
    } = this.props;
    const { displayName, status, lastDate } = userInfo;
    const { id: chatId, messages } = chat;
    const { id: myId } = me;

    const myAvatar = getAvatar(me);
    const contactAvatar = getAvatar(userInfo);
    const isOnline = status === 'ONLINE';
    const statusText = isOnline
      ? 'online'
      : userLastDateParser(lastDate);

    return (
      <Wrapper square elevation={0}>
        <ChatTopBar
          name={displayName}
          isOnline={isOnline}
          statusText={statusText}
        />
        <ChatMessages
          chatId={chatId}
          loading={loading}
          adding={adding}
          myId={myId}
          messages={messages}
          optimisticIds={optimisticIds}
          getMessages={() => this.getMessages(true)}
          fetchThreshold={5}
        />
        <ChatComment
          adding={adding}
          avatars={{
            me: myAvatar,
            contact: contactAvatar,
          }}
          submit={this.addMessage}
        />
      </Wrapper>
    );
  }
}


Chat.propTypes = {
  loading: PropTypes.bool.isRequired,
  adding: PropTypes.bool.isRequired,
  me: PropTypes.shape(meProps).isRequired,
  userInfo: PropTypes.shape(userInfoProps).isRequired,
  chat: PropTypes.shape(chatProps).isRequired,
  optimisticIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateOptimisticIds: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  getAddMessageOptimisticResponse: PropTypes.func.isRequired,
  fetchMoreMessages: PropTypes.func.isRequired,
  fetchMoreMessagesUpdate: PropTypes.func.isRequired,
};

export default Chat;
