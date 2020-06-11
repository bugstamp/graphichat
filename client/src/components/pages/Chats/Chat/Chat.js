import React, { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import queryString from 'query-string';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { isEqual, isEmpty } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ChatTopBar from './ChatTopBar';
import ChatMessages from './ChatMessages';
import ChatMessageInput from './ChatMessageInput';
import useAvatar from '../../../hooks/useAvatar';

import gql from '../../../../gql';

const {
  MESSAGE_ADDED_SUBSCRIPTION,
  GET_ME,
  GET_CHAT,
  GET_CHAT_MESSAGES,
  ADD_MESSAGE,
} = gql;

const getOptimisticMessage = ({
  chatId,
  myId,
  optimisticId,
  content,
  time,
}) => ({
  __typename: 'Mutation',
  addMessage: {
    chatId,
    optimistic: true,
    optimisticId,
    message: {
      id: optimisticId,
      senderId: myId,
      content,
      time,
      type: 'text',
      seen: false,
      edited: false,
      __typename: 'ChatMessage',
    },
    __typename: 'MessageUpdate',
  },
});


const Wrapper = styled(Paper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #fff;
  }
`;

const Chat = (props) => {
  const { search } = useLocation();
  console.count('chat render');
  const { chatId: selectedChatId } = queryString.parse(search);

  const addMessageMutationUpdate = (client, result) => {
    const { chatId, message } = result;
    const { chat, contact } = client.readQuery({ query: GET_CHAT, variables: { chatId } });

    client.writeQuery({
      query: GET_CHAT,
      data: {
        contact,
        chat: {
          ...chat,
          messages: [...chat.messages, message],
        },
      },
    });
  };

  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData({ client, subscriptionData: { data: { messageAdded } } }) {
      addMessageMutationUpdate(client, messageAdded);
    },
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
    update(client, { data: { addMessage: newMessage } }) {
      addMessageMutationUpdate(client, newMessage);
    },
  });

  const { chat, contact } = data;
  const { id: myId } = me;
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
      updateQuery(prev, { fetchMoreResult: { chatMessages } }) {
        return {
          ...prev,
          chat: {
            ...prev.chat,
            messages: [...chatMessages, ...prev.chat.messages],
          },
        };
      },
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

  let unselectedText = '';

  if (!selectedChatId) {
    unselectedText = 'Please select a chat to start messaging';
  } else if (isEmpty(chat)) {
    unselectedText = 'Selected chat is undefined';
  }

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
    <Wrapper square elevation={0}>
      <Choose>
        <When condition={isEmpty(me)}>
          {null}
        </When>
        <When condition={unselectedText}>
          <Typography variant="subtitle2">
            <p>{unselectedText}</p>
          </Typography>
        </When>
        <Otherwise>
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
          <ChatMessageInput
            chatId={chatId}
            myAvatar={myAvatar}
            contactAvatar={contactAvatar}
            submit={handleAddMessage}
          />
        </Otherwise>
      </Choose>
    </Wrapper>
  );
};


Chat.propTypes = {
  // loading: PropTypes.bool.isRequired,
  // adding: PropTypes.bool.isRequired,
  // userInfo: PropTypes.shape(userInfoProps).isRequired,
  // chat: PropTypes.shape(chatProps).isRequired,
  // optimisticIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // updateOptimisticIds: PropTypes.func.isRequired,
  // addMessage: PropTypes.func.isRequired,
  // getOptimisticMessage: PropTypes.func.isRequired,
};

export default memo(Chat);
