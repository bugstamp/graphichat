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
import Contacts, { NoContactInfo } from './Contacts';
import Messages from './Messages';

import { AppContext } from '../../context/AppProvider';

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
    sendedIds: [],
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

  updateSendedIds = (optimisticId, action = 'add') => {
    this.setState(({ sendedIds }) => {
      let newSendedIds = sendedIds;

      if (action === 'add') {
        newSendedIds = concat(sendedIds, optimisticId);
      } else if (action === 'remove') {
        newSendedIds = filter(sendedIds, id => id !== optimisticId);
      }
      return ({ sendedIds: newSendedIds });
    });
  }

  render() {
    const { selected, sendedIds } = this.state;

    return (
      <AppContext.Consumer>
        {({ user, fetching }) => (
          <ChatsContainer
            messageAddedSubscriptionProps={{
              variables: { chatId: selected },
            }}
            addMessageProps={{
              onCompleted: ({ addMessage: { optimisticId } }) => {
                this.updateSendedIds(optimisticId, 'remove');
              },
            }}
          >
            {({
              getMyChats: {
                data: { myContacts, myChats },
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
                        loading={fetching}
                        me={user}
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
                            <NoContactInfo>
                              <Typography variant="subtitle2">
                                <p>Please select a chat to start messaging</p>
                              </Typography>
                            </NoContactInfo>
                          </When>
                          <Otherwise>
                            <Messages
                              loading={loading}
                              adding={adding}
                              me={user}
                              contact={selectedContact}
                              chat={selectedChat}
                              sendedIds={sendedIds}
                              fetchMoreMessages={fetchMoreMessages}
                              addMessage={addMessage}
                              updateSendedIds={this.updateSendedIds}
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
        )}
      </AppContext.Consumer>
    );
  }
}

export default withRouter(Chats);
