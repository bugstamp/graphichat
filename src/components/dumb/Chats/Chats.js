import React, { Component } from 'react';
import styled from 'styled-components';
import { size } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import ContactPanel from '../../common/ContactPanel/ContactPanel';
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
  render() {
    return (
      <ChatsContainer>
        {({ getMyChats: { data: { myContacts, myChats } } }) => {
          return (
            <Wrapper square elevation={0}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} lg={3}>
                  <ContactPanel contacts={myContacts} chats={myChats} />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>
                    <MessagePanel />
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

export default Chats;
