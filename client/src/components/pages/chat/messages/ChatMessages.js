import React, {
  useEffect,
  useCallback,
  memo,
} from 'react';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import queryString from 'query-string';
import uuid from 'uuid/v4';
import { isEmpty } from 'lodash';

import ChatMessagesPlaceholder from './ChatMessagesPlaceholder';
import ChatTopbar from './topbar';
import ChatMessageList from './list';
import ChatInput from './input';

import useAvatar from '../../../hooks/useAvatar';
import gql from '../../../../gql';
import {
  fetchMoreMessagesUpdate,
  getOptimisticMessage,
  addMessageMutationUpdate,
} from '../../../../gql/updates/chat';

import { ChatMessagesStyled } from './styled';

const {
  GET_ME,
  GET_CHAT,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
} = gql;

const ChatMessages = () => {
  const { search } = useLocation();
  const { chatId: selectedChatId } = queryString.parse(search);

  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const {
    loading,
    data = { chat: {}, contact: {} },
    refetch,
    fetchMore,
  } = useQuery(GET_CHAT, {
    variables: { chatId: selectedChatId },
    skip: !selectedChatId || isEmpty(me),
    fetchPolicy: 'cache-first',
    // notifyOnNetworkStatusChange: true,
  });
  const [addMessage, { loading: adding }] = useMutation(ADD_MESSAGE, {
    update: addMessageMutationUpdate,
  });

  const { id: myId } = me;
  const { chat, contact } = data;
  const { id: chatId, messages } = chat;
  const { userInfo = {} } = contact;
  const {
    displayName,
    status,
    lastDate,
  } = userInfo;
  const myAvatar = useAvatar(me);
  const contactAvatar = useAvatar(userInfo);

  const fetchMoreMessages = useCallback(() => {
    fetchMore({
      query: GET_CHAT_MESSAGES,
      variables: { chatId: selectedChatId, skip: messages.length },
      updateQuery: fetchMoreMessagesUpdate,
    });
  }, [selectedChatId, messages, fetchMore]);

  const handleAddMessage = useCallback((content) => {
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
  }, [chatId, myId, addMessage]);

  useEffect(() => {
    refetch();
  }, [selectedChatId, refetch]);

  useEffect(() => {
    const fetchMoreSize = 20;

    if (chatId && (messages.length < fetchMoreSize)) {
      fetchMoreMessages();
    }
  }, [chatId, messages, fetchMoreMessages]);

  return (
    <ChatMessagesStyled square elevation={0}>
      <ChatMessagesPlaceholder
        selectedChatId={selectedChatId}
        chatId={chatId}
        myId={myId}
      >
        <ChatTopbar
          name={displayName}
          status={status}
          lastDate={lastDate}
        />
        <ChatMessageList
          chatId={selectedChatId}
          loading={loading}
          adding={adding}
          myId={myId}
          myAvatar={myAvatar}
          contactAvatar={contactAvatar}
          messages={messages}
          getMessages={fetchMoreMessages}
        />
        <ChatInput
          chatId={chatId}
          myAvatar={myAvatar}
          contactAvatar={contactAvatar}
          submit={handleAddMessage}
        />
      </ChatMessagesPlaceholder>
    </ChatMessagesStyled>
  );
};

ChatMessages.propTypes = {};

export default memo(ChatMessages);
