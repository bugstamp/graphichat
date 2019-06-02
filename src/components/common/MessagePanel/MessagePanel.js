import React, { Component } from 'react';
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
    const { messages } = chat;

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
          loading={loading}
          myId={me.id}
          messages={messages}
          sendedIds={sendedIds}
        />
        <MessagePanelComment
          adding={adding}
          avatars={{
            me: {
              src: null,
              text: myAvatarText,
            },
            contact: {
              src: null,
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
