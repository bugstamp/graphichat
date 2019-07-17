import React, { Component } from 'react';
import styled from 'styled-components';
import { isEqual, map, concat } from 'lodash';
import uuid from 'uuid/v4';

import Paper from '@material-ui/core/Paper';

import MessagePanelTopBar from './MessagePanelTopBar';
import MessagePanelMessages from './MessagePanelMessages';
import MessagePanelComment from './MessagePanelComment';

import { getSpacing } from '../../../styles';
import { getAvatarInitials, userLastDateParser } from '../../../helpers';
import gql from '../../../gql';

const { GET_CHAT_MESSAGES } = gql;

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
  fetchSize = 20;

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate(prevProps) {
    const { chat: { id } } = this.props;

    if (!isEqual(prevProps.chat.id, id)) {
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
      chat: { id: chatId },
      me,
      updateSendedIds,
      addMessage,
    } = this.props;
    const { id } = me;
    const time = new Date();
    const optimisticId = uuid();

    const variables = {
      chatId,
      content,
      time,
      optimisticId,
    };

    updateSendedIds(optimisticId);
    addMessage({
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        addMessage: {
          chatId,
          optimistic: true,
          optimisticId,
          message: {
            id: optimisticId,
            senderId: id,
            content,
            time,
            type: 'text',
            seen: false,
            edited: false,
            __typename: 'ChatMessage',
          },
          __typename: 'MessageUpdate',
        },
      },
    });
  }

  fetchMoreMessages = (variables) => {
    const { fetchMoreMessages } = this.props;

    fetchMoreMessages({
      query: GET_CHAT_MESSAGES,
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        const { myChats: chats } = prev;
        const { chatMessages } = fetchMoreResult;
        const { chatId } = variables;
        const updatedChats = map(chats, (chat) => {
          const { id, messages } = chat;

          if (id === chatId) {
            const updatedMessages = concat(chatMessages, messages);

            return { ...chat, messages: updatedMessages };
          }
          return chat;
        });

        return { ...prev, myChats: updatedChats };
      },
    });
  };

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
          getMessages={() => this.getMessages(true)}
          fetchSize={this.fetchSize}
          fetchTreshold={5}
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
