import React, { Component } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

import MessagePanelTopBar from './MessagePanelTopBar';
import MessagePanelMessages from './MessagePanelMessages';
import MessagePanelComment from './MessagePanelComment';

import MessagePanelContainer from '../../smart/MessagePanelContainer';

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
  render() {
    const { me, contact, chat } = this.props;
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
    const lastMessageTime = messages[0].time;

    return (
      <MessagePanelContainer
        getChatMessagesProps={{
          variables: {
            chatId,
            lastMessageTime,
          },
        }}
      >
        {() => {
          return (
            <WrapperPaper square elevation={0}>
              <MessagePanelTopBar
                name={displayName}
                isOnline={isOnline}
                statusText={statusText}
              />
              <MessagePanelMessages myId={me.id} messages={messages} />
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
              />
            </WrapperPaper>
          );
        }}
      </MessagePanelContainer>
    );
  }
}

export default MessagePanel;
