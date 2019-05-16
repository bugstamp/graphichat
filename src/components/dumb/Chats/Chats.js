import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { size } from 'polished';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import ContactPanel, { NoContactInfo } from '../../common/ContactPanel/ContactPanel';
import MessagePanel from '../../common/MessagePanel/MessagePanel';

import ChatsContainer from '../../smart/ChatsContainer';

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
  checkSelected = () => {
    const { location: { search } } = this.props;
    const { contact } = queryString.parse(search);

    return contact || undefined;
  }

  selectChat = (username = '', id = null) => {
    const { history } = this.props;
    const route = username ? `@${username}` : id;

    history.push(`/chats?contact=${route}`);
  }

  render() {
    const selectedContact = this.checkSelected();

    return (
      <ChatsContainer getMeLocalProps={{ skip: !selectedContact }}>
        {({ getMyChats: { data: { myContacts, myChats } } }) => {
          return (
            <Wrapper square elevation={0}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} lg={3}>
                  <ContactPanel
                    contacts={myContacts}
                    chats={myChats}
                    selectChat={this.selectChat}
                  />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>
                    <Choose>
                      <When condition={isEmpty(myContacts)}>
                        {null}
                      </When>
                      <When condition={selectedContact}>
                        <MessagePanel />
                      </When>
                      <Otherwise>
                        <NoContactInfo>
                          <Typography variant="subtitle2">
                            <p>Please select a chat to start messaging</p>
                          </Typography>
                        </NoContactInfo>
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
