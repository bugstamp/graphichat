import React, {
  useEffect,
  useCallback,
  memo,
} from 'react';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import queryString from 'query-string';
import uuid from 'uuid/v4';
import { isEmpty } from 'lodash';

import ChatPlaceholder from './ChatPlaceholder';
import ChatTopBar from './ChatTopBar/ChatTopBar';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInput from './ChatInput/ChatInput';

import useAvatar from '../../../hooks/useAvatar';
import gql from '../../../../gql';
import {
  fetchMoreMessagesUpdate,
  getOptimisticMessage,
  addMessageMutationUpdate,
  messageAddedSubscriptionUpdate,
} from '../../../../gql/updates/chat';

import { ChatStyled } from './styled';

const {
  MESSAGE_ADDED_SUBSCRIPTION,
  GET_ME,
  GET_CHAT,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
} = gql;

const Chat = () => {
  const { search } = useLocation();
  const { chatId: selectedChatId } = queryString.parse(search);

  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData: messageAddedSubscriptionUpdate,
  });
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
    <ChatStyled square elevation={0}>
      <ChatPlaceholder
        selectedChatId={selectedChatId}
        chatId={chatId}
        myId={myId}
      >
        <ChatTopBar
          name={displayName}
          status={status}
          lastDate={lastDate}
        />
        <ChatMessages
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
      </ChatPlaceholder>
    </ChatStyled>
  );
};

Chat.propTypes = {};

export default memo(Chat);
