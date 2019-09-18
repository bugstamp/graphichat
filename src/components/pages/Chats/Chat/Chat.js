import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import uuid from 'uuid/v4';

import Paper from '@material-ui/core/Paper';

import ChatTopBar from './ChatTopBar';
import ChatMessages from './ChatMessages';
import ChatMessageInput from './ChatMessageInput';

import { getAvatar, userLastDateParser } from '../../../../helpers';
import { meProps, userInfoProps, chatProps } from '../../../propTypes';

const Wrapper = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #fff;
  }
`;

class Chat extends Component {
  fetchSize = 20;

  state = {
    myAvatar: {},
    contactAvatar: {},
  }

  componentDidMount() {
    this.getMessages(false);
    this.updateAvatars();
  }

  componentDidUpdate(prevProps) {
    const { chat: { id: chatId } } = this.props;

    if (!isEqual(prevProps.chat.id, chatId)) {
      this.getMessages(false);
      this.updateAvatars();
    }
  }

  updateAvatars = () => {
    const { me, userInfo } = this.props;
    const myAvatar = getAvatar(me);
    const contactAvatar = getAvatar(userInfo);

    this.setState({
      myAvatar,
      contactAvatar,
    });
  }

  getMessages = (fetchMore = true) => {
    const { chat } = this.props;
    const { id: chatId, messages } = chat;
    const skip = messages.length;

    if (fetchMore) {
      if (skip < this.fetchSize) {
        this.fetchMoreMessages({ chatId, skip });
      }
    } else {
      this.fetchMoreMessages({ chatId, skip });
    }
  }

  fetchMoreMessages = (variables) => {
    const {
      fetchMoreMessages,
      fetchMoreMessagesUpdate,
    } = this.props;

    fetchMoreMessages(fetchMoreMessagesUpdate(variables));
  };

  addMessage = (content) => {
    const {
      me: { id: myId },
      chat: { id: chatId },
      updateOptimisticIds,
      addMessage,
      getOptimisticMessage,
    } = this.props;
    const time = new Date();
    const optimisticId = uuid();

    const variables = {
      chatId,
      content,
      time,
      optimisticId,
    };
    const optimisticResponse = getOptimisticMessage({
      chatId,
      optimisticId,
      myId,
      content,
      time,
    });

    addMessage({ variables, optimisticResponse });
    updateOptimisticIds(optimisticId);
  }

  render() {
    const { myAvatar, contactAvatar } = this.state;
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
          getMessages={this.getMessages}
          fetchThreshold={2}
          myAvatar={myAvatar}
          contactAvatar={contactAvatar}
        />
        <ChatMessageInput
          myAvatar={myAvatar}
          contactAvatar={contactAvatar}
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
  getOptimisticMessage: PropTypes.func.isRequired,
  fetchMoreMessages: PropTypes.func.isRequired,
  fetchMoreMessagesUpdate: PropTypes.func.isRequired,
};

export default Chat;
