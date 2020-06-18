import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import queryString from 'query-string';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import ChatList from './list';
import ChatMessages from './messages';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';

import gql from '../../../gql';
import { userContactSubscriptionUpdate, userActivityUpdate } from '../../../gql/updates/user';
import { chatCreatedSubscriptionUpdate, messageAddedSubscriptionUpdate } from '../../../gql/updates/chat';

import { ChatWrapper } from './styled';

const {
  GET_INITIAL_DATA,
  USER_UPDATE_SUBSCRIPTION,
  USER_ACTIVITY_SUBSCRIPTION,
  CHAT_CREATED_SUBSCRIPTION,
  MESSAGE_ADDED_SUBSCRIPTION,
} = gql;

const Chat = () => {
  const { search } = useLocation();
  const { chatId: selectedChatId } = queryString.parse(search);

  useSubscription(USER_UPDATE_SUBSCRIPTION, {
    onSubscriptionData: userContactSubscriptionUpdate,
  });
  useSubscription(USER_ACTIVITY_SUBSCRIPTION, {
    onSubscriptionData: userActivityUpdate,
  });
  useSubscription(CHAT_CREATED_SUBSCRIPTION, {
    onSubscriptionData: chatCreatedSubscriptionUpdate,
  });
  useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    onSubscriptionData: messageAddedSubscriptionUpdate,
  });
  const { loading, networkStatus } = useQuery(GET_INITIAL_DATA, {
    notifyOnNetworkStatusChange: true,
  });

  const onCloseSwipeableChat = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <ChatWrapper>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4}>
          <ChatList loading={loading} />
        </Grid>
        <Hidden smDown>
          <Grid item md={8}>
            <ChatMessages />
          </Grid>
        </Hidden>
      </Grid>
      <Hidden mdUp>
        <FullWidthSwipeableDrawer
          open={!!selectedChatId}
          onClose={onCloseSwipeableChat}
        >
          <ChatMessages />
        </FullWidthSwipeableDrawer>
      </Hidden>
    </ChatWrapper>
  );
};

export default Chat;
