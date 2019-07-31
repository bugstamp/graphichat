import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { size } from 'polished';
import { isEmpty, concat, filter } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import ChatsContainer, {
  fetchMoreMessagesUpdate,
  getAddMessageOptimisticResponse,
} from '../../containers/ChatsContainer';
import Contacts from './Contacts';
import Chat from './Chat';
import { NoContentWrapper } from '../../common/List';

import { getStyledProps, getSpacing } from '../../../styles';

const Wrapper = styled(Paper)`
  && {
    ${size('100%')};
    display: flex;
    align-items: stretch;
  }
`;

const InfoPanel = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)};
    background-color: ${getStyledProps('theme.palette.background.default')};
  }
`;

class Chats extends Component {
  state = {
    optimisticIds: [],
  }

  checkRoute = () => {
    const { location: { search } } = this.props;
    const { chatId } = queryString.parse(search);

    return chatId;
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
    const { initialLoading } = this.props;
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
            data: { me = {} },
          },
          getMyChats: {
            data: { myContacts = [], myChats = [] },
          },
          addMessage: {
            mutation: addMessage,
            result: {
              loading: adding,
            },
          },
          selectChat: {
            mutation: selectChat,
          },
          getSelectedChat: {
            data: { selectedChat = { contact: {}, chat: {} } },
            fetchMore: fetchMoreMessages,
            loading,
          },
        }) => {
          const { contact, chat } = selectedChat;
          const contactsListIsEmpty = isEmpty(myContacts);
          const chatIsUndefined = isEmpty(chat);
          let unselectedText;

          if (!selectedChatId) {
            unselectedText = 'Please select a chat to start messaging';
          } else if (isEmpty(chat)) {
            unselectedText = 'Selected chat is undefined';
          }

          return (
            <Wrapper square elevation={0}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} lg={3}>
                  <Contacts
                    loading={initialLoading}
                    myId={me.id}
                    contacts={myContacts}
                    chats={myChats}
                    selectedChatId={selectedChatId}
                    selectChat={selectChat}
                    changeRoute={this.changeRoute}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>
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
                          getAddMessageOptimisticResponse={getAddMessageOptimisticResponse}
                          updateOptimisticIds={this.updateOptimisticIds}
                        />
                      </Otherwise>
                    </Choose>
                  </Grid>
                </Hidden>
                <Hidden mdDown>
                  <Grid item lg={3}>
                    <InfoPanel square elevation={0}>{null}</InfoPanel>
                  </Grid>
                </Hidden>
              </Grid>
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
};

export default withRouter(Chats);