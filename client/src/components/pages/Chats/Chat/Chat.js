import React, { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
  const {
    location,
    history,
  } = props;
  console.count('chat render');
  const { search } = location;
  const { chatId: selectedChatId } = queryString.parse(search);
  // const addMessage = (content) => {
  //   const {
  //     me: { id: myId },
  //     chat: { id: chatId },
  //     updateOptimisticIds,
  //     addMessage,
  //     getOptimisticMessage,
  //   } = props;
  //   const time = new Date();
  //   const optimisticId = uuid();
  //
  //   const variables = {
  //     chatId,
  //     content,
  //     time,
  //     optimisticId,
  //   };
  //   const optimisticResponse = getOptimisticMessage({
  //     chatId,
  //     optimisticId,
  //     myId,
  //     content,
  //     time,
  //   });
  //
  //   addMessage({ variables, optimisticResponse });
  //   updateOptimisticIds(optimisticId);
  // };
  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData({ client, subscriptionData: { data: { messageAdded } } }) {
      console.log(messageAdded);
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
  // const [addMessage, { loading: adding }] = useMutation(ADD_MESSAGE);
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
            messages: [...prev.chat.messages, ...chatMessages],
          },
        };
      },
    });
  }, [selectedChatId, messages, fetchMore]);

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
  }, [chatId, selectedChatId, messages, fetchMoreMessages]);

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
            messages={messages}
            // optimisticIds={optimisticIds}
            getMessages={fetchMoreMessages}
            myAvatar={myAvatar}
            contactAvatar={contactAvatar}
          />
          <ChatMessageInput
            chatId={chatId}
            myAvatar={myAvatar}
            contactAvatar={contactAvatar}
            // submit={addMessage}
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

export default withRouter(memo(Chat));
