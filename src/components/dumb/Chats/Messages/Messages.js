import React, { Component } from 'react';
import styled from 'styled-components';
import { isEqual, map, concat } from 'lodash';
import uuid from 'uuid/v4';

import Paper from '@material-ui/core/Paper';

import MessagesTopBar from './MessagesTopBar';
import MessagesList from './MessagesList';
import MessagesComment from './MessagesComment';

import { getSpacing } from '../../../../styles';
import { getAvatar, userLastDateParser } from '../../../../helpers';
import gql from '../../../../gql';

const {
  GET_CHAT_MESSAGES,
  GET_SELECTED_CHAT,
} = gql;

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

class Messages extends Component {
  fetchSize = 30;

  componentDidMount() {
    this.getMessages();
  }

  componentDidUpdate(prevProps) {
    const { chat: { id, messages } } = this.props;

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
      updateOptimisticIds,
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

    updateOptimisticIds(optimisticId);
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

    // fetchMoreMessages({
    //   query: GET_CHAT_MESSAGES,
    //   variables,
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     const { myChats: chats } = prev;
    //     const { chatMessages } = fetchMoreResult;
    //     const { chatId } = variables;
    //     const updatedChats = map(chats, (chat) => {
    //       const { id, messages } = chat;
    //
    //       if (id === chatId) {
    //         const updatedMessages = concat(chatMessages, messages);
    //
    //         return { ...chat, messages: updatedMessages };
    //       }
    //       return chat;
    //     });
    //
    //     return { ...prev, myChats: updatedChats };
    //   },
    // });
    fetchMoreMessages({
      query: GET_CHAT_MESSAGES,
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        const { selectedChat } = prev;
        const { chatMessages } = fetchMoreResult;
        const { chat, ...rest } = selectedChat;
        const { messages } = chat;
        // const { chatId } = variables;
        // const updatedChats = map(chats, (chat) => {
        //   const { id, messages } = chat;
        //
        //   if (id === chatId) {
        //     const updatedMessages = concat(chatMessages, messages);
        //
        //     return { ...chat, messages: updatedMessages };
        //   }
        //   return chat;
        // });

        return {
          selectedChat: {
            ...rest,
            chat: { ...chat, messages: concat(chatMessages, messages) },
          },
        };
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
      optimisticIds,
    } = this.props;
    const { userInfo } = contact;
    const { displayName, status, lastDate } = userInfo;
    const { id: chatId, messages } = chat;

    const isOnline = status === 'ONLINE';
    const statusText = isOnline
      ? 'online'
      : userLastDateParser(lastDate);
    const myAvatar = getAvatar(me);
    const contactAvatar = getAvatar(userInfo);

    return (
      <Wrapper square elevation={0}>
        <MessagesTopBar
          name={displayName}
          isOnline={isOnline}
          statusText={statusText}
        />
        <MessagesList
          chatId={chatId}
          loading={loading}
          adding={adding}
          myId={me.id}
          messages={messages}
          optimisticIds={optimisticIds}
          getMessages={() => this.getMessages(true)}
          fetchThreshold={5}
        />
        <MessagesComment
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

export default Messages;
