import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { size } from 'polished';
import {
  get, isEmpty, concat, filter, find,
} from 'lodash';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import ChatsContainer, {
  fetchMoreMessagesUpdate,
  getOptimisticMessage,
} from '../../containers/ChatsContainer';
import Contacts from './Contacts';
import Chat from './Chat';
import { NoContentWrapper } from '../../common/List';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';

const Wrapper = styled.div`
  && {
    ${size('100%')};
    display: flex;
    align-items: stretch;
  }
`;

class Chats extends Component {
  state = {
    optimisticIds: [],
  }

  checkRoute = () => {
    const { location: { search } } = this.props;
    const { chatId } = queryString.parse(search);

    return chatId || null;
  }

  changeRoute = (chatId) => {
    const { history } = this.props;

    history.push(`/chats?chatId=${chatId}`);
  }

  updateOptimisticIds = (optimisticId, action = 'add') => {
    this.setState(({ optimisticIds }) => {
      let newSendedIds;

      switch (action) {
        case 'add': {
          newSendedIds = concat(optimisticIds, optimisticId);
          break;
        }
        case 'remove': {
          newSendedIds = filter(optimisticIds, id => id !== optimisticId);
          break;
        }
        default: {
          newSendedIds = optimisticIds;
        }
      }
      return ({ optimisticIds: newSendedIds });
    });
  }

  render() {
    const { optimisticIds } = this.state;
    const {
      initialLoading,
      history,
      toggleSettingsDialog,
      signOut,
    } = this.props;
    const selectedChatId = initialLoading ? null : this.checkRoute();

    return (
      <ChatsContainer
        messageAddedSubscriptionProps={{
          variables: { chatId: selectedChatId },
        }}
        addMessageProps={{
          onCompleted: ({ addMessage: { optimisticId } }) => {
            this.updateOptimisticIds(optimisticId, 'remove');
          },
        }}
      >
        {({
          getMe: {
            data: myData,
          },
          getMyChats: {
            data: myChatsData,
            fetchMore: fetchMoreMessages,
            loading,
          },
          addMessage: {
            mutation: addMessage,
            result: { loading: adding },
          },
        }) => {
          const me = get(myData, 'me', {});
          const { myContacts, myChats } = myChatsData;
          const contact = find(myContacts, { chatId: selectedChatId }) || { userInfo: {} };
          const chat = find(myChats, { id: selectedChatId }) || {};
          const contactsListIsEmpty = isEmpty(myContacts);
          const chatIsUndefined = isEmpty(chat);

          let unselectedText;
          if (!selectedChatId) {
            unselectedText = 'Please select a chat to start messaging';
          } else if (isEmpty(chat)) {
            unselectedText = 'Selected chat is undefined';
          }

          const renderChat = () => (
            <Chat
              loading={loading}
              adding={adding}
              me={me}
              userInfo={contact.userInfo}
              chat={chat}
              optimisticIds={optimisticIds}
              fetchMoreMessages={fetchMoreMessages}
              fetchMoreMessagesUpdate={fetchMoreMessagesUpdate}
              addMessage={addMessage}
              getOptimisticMessage={getOptimisticMessage}
              updateOptimisticIds={this.updateOptimisticIds}
            />
          );

          return (
            <Wrapper>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={4}>
                  <Contacts
                    toggleSettingsDialog={toggleSettingsDialog}
                    signOut={signOut}
                  />
                </Grid>
                <Hidden smDown>
                  <Grid item md={8}>
                    <Choose>
                      <When condition={contactsListIsEmpty}>
                        {null}
                      </When>
                      <When condition={!selectedChatId || chatIsUndefined}>
                        <NoContentWrapper>
                          <Typography variant="subtitle2">
                            <p>{unselectedText}</p>
                          </Typography>
                        </NoContentWrapper>
                      </When>
                      <Otherwise>
                        {renderChat()}
                      </Otherwise>
                    </Choose>
                  </Grid>
                </Hidden>
              </Grid>
              <Hidden mdUp>
                <FullWidthSwipeableDrawer
                  open={!!selectedChatId}
                  onClose={() => {
                    history.goBack();
                  }}
                >
                  <If condition={selectedChatId && !chatIsUndefined}>
                    {renderChat()}
                  </If>
                </FullWidthSwipeableDrawer>
              </Hidden>
            </Wrapper>
          );
        }}
      </ChatsContainer>
    );
  }
}

Chats.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  initialLoading: PropTypes.bool.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withRouter(Chats);
