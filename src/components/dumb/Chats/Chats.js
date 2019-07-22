import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { size } from 'polished';
import {
  isEmpty, isEqual, find, concat, filter,
} from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import ChatsContainer from '../../smart/ChatsContainer';
import Contacts from './Contacts';
import Messages from './Messages';
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
    selected: null,
    optimisticIds: [],
  }

  componentDidMount() {
    const selected = this.checkRoute();

    if (selected) {
      this.selectChat(selected);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (!isEqual(prevProps.location, location)) {
      const selected = this.checkRoute();

      if (!selected) {
        this.selectChat(null);
      } else {
        this.selectChat(selected);
      }
    }
  }

  checkRoute = () => {
    const { location: { search } } = this.props;
    const { chatId } = queryString.parse(search);

    return chatId;
  }

  selectChat = (chatId, changeRoute = false) => {
    const { history } = this.props;

    this.setState({ selected: chatId });

    if (changeRoute) {
      history.push(`/chats?chatId=${chatId}`);
    }
  }

  updateOptimisticIds = (optimisticId, action = 'add') => {
    this.setState(({ optimisticIds }) => {
      let newSendedIds = optimisticIds;

      if (action === 'add') {
        newSendedIds = concat(optimisticIds, optimisticId);
      } else if (action === 'remove') {
        newSendedIds = filter(optimisticIds, id => id !== optimisticId);
      }
      return ({ optimisticIds: newSendedIds });
    });
  }

  render() {
    const { selected, optimisticIds } = this.state;
    const { initialLoading } = this.props;

    return (
      <ChatsContainer
        messageAddedSubscriptionProps={{
          variables: { chatId: selected },
        }}
        addMessageProps={{
          onCompleted: ({ addMessage: { optimisticId } }) => {
            this.updateOptimisticIds(optimisticId, 'remove');
          },
        }}
      >
        {({
          getMe: { data: { me = {} } },
          getMyChats: {
            data: { myContacts = [], myChats = [] },
            fetchMore: fetchMoreMessages,
            loading,
          },
          addMessage: {
            mutation: addMessage,
            result: { loading: adding },
          },
        }) => {
          const selectedContact = find(myContacts, { chatId: selected });
          const selectedChat = find(myChats, { id: selected });

          return (
            <Wrapper square elevation={0}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} lg={3}>
                  <Contacts
                    loading={initialLoading}
                    me={me}
                    contacts={myContacts}
                    chats={myChats}
                    selected={selected}
                    selectChat={chatId => this.selectChat(chatId, true)}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>
                    <Choose>
                      <When condition={isEmpty(myContacts)}>
                        {null}
                      </When>
                      <When condition={!selected}>
                        <NoContentWrapper>
                          <Typography variant="subtitle2">
                            <p>Please select a chat to start messaging</p>
                          </Typography>
                        </NoContentWrapper>
                      </When>
                      <When condition={!selectedChat}>
                        <NoContentWrapper>
                          <Typography variant="subtitle2">
                            <p>Selected chat is undefined</p>
                          </Typography>
                        </NoContentWrapper>
                      </When>
                      <Otherwise>
                        <Messages
                          loading={loading}
                          adding={adding}
                          me={me}
                          contact={selectedContact}
                          chat={selectedChat}
                          optimisticIds={optimisticIds}
                          fetchMoreMessages={fetchMoreMessages}
                          addMessage={addMessage}
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

export default withRouter(Chats);
