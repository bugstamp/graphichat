import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import uuid from 'uuid/v4';

import Paper from '@material-ui/core/Paper';

import MessagePanelTopBar from './MessagePanelTopBar';
import MessagePanelMessages from './MessagePanelMessages';
import MessagePanelComment from './MessagePanelComment';

import { getSpacing } from '../../../styles';
import { getAvatarInitials, userLastDateParser } from '../../../helpers';

const WrapperPaper = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} 0;
    background-color: #fff;
  }
`;

class MessagePanel extends Component {
  componentDidMount() {
    this.getMessages(true);
  }

  componentDidUpdate(prevProps) {
    const { chat: { id } } = this.props;

    if (!isEqual(prevProps.chat.id, id)) {
      this.getMessages(true);
    }
  }

  getMessages = (initial = false) => {
    const { fetchMoreMessages, chat } = this.props;
    const { id, messages } = chat;

    if (initial) {
      if (messages.length < 20) {
        fetchMoreMessages(id, messages.length);
      }
    } else {
      fetchMoreMessages(id, messages.length);
    }
  }

  addMessage = (content) => {
    const { chat: { id: chatId }, addMessage } = this.props;
    const optimisticId = uuid();
    const time = new Date();

    addMessage({
      chatId,
      content,
      time,
      optimisticId,
    });
  }

  render() {
    const {
      loading,
      adding,
      me,
      contact,
      chat,
      sendedIds,
    } = this.props;
    const { userInfo } = contact;
    const { displayName, status, lastDate } = userInfo;
    const { id: chatId, messages } = chat;

    const isOnline = status === 'ONLINE';
    const statusText = isOnline
      ? 'online'
      : userLastDateParser(lastDate);
    const myAvatarText = getAvatarInitials(me);
    const contactAvatarText = getAvatarInitials(userInfo);

    return (
      <WrapperPaper square elevation={0}>
        <MessagePanelTopBar
          name={displayName}
          isOnline={isOnline}
          statusText={statusText}
        />
        <MessagePanelMessages
          chatId={chatId}
          loading={loading}
          adding={adding}
          myId={me.id}
          messages={messages}
          sendedIds={sendedIds}
          getMessages={this.getMessages}
        />
        <MessagePanelComment
          adding={adding}
          avatars={{
            me: {
              src: me.avatar && me.avatar.sm,
              text: myAvatarText,
            },
            contact: {
              src: userInfo.avatar && userInfo.avatar.sm,
              text: contactAvatarText,
            },
          }}
          submit={this.addMessage}
        />
      </WrapperPaper>
    );
  }
}

export default MessagePanel;
