import React, { Component } from 'react';
import styled from 'styled-components';
import { isEqual } from 'lodash';

import Paper from '@material-ui/core/Paper';

import MessagePanelTopBar from './MessagePanelTopBar';
import MessagePanelMessages from './MessagePanelMessages';
import MessagePanelComment from './MessagePanelComment';

import { getSpacing } from '../../../styles';
import { getContactInitials, userLastDateParser } from '../../../helpers';

const WrapperPaper = styled(Paper)`
  && {
    height: 100%;
    max-width: 700px;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} ${getSpacing(2)};
    margin: 0 auto;
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
    const { chat: { id }, addMessage } = this.props;

    addMessage({ variables: { chatId: id, content } });
  }

  render() {
    const { me, contact, chat, addMessage, loading } = this.props;
    const { userInfo } = contact;
    const {
      firstName,
      lastName,
      displayName,
      status,
      lastDate,
    } = userInfo;
    const { id: chatId, messages } = chat;

    const isOnline = status === 'ONLINE';
    const statusText = isOnline
      ? 'online'
      : userLastDateParser(lastDate);
    const myAvatarText = getContactInitials(me.firstName, me.lastName);
    const contactAvatarText = getContactInitials(firstName, lastName);

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
        />
        <MessagePanelComment
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
