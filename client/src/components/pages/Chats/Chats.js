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
  render() {
    const {
      toggleSettingsDialog,
      signOut,
    } = this.props;

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
              <Chat />
            </Grid>
          </Hidden>
        </Grid>
        {/* <Hidden mdUp>
          <FullWidthSwipeableDrawer
            open={!!selectedChatId}
            onClose={() => {
          history.goBack();
            }}
          >
          </FullWidthSwipeableDrawer>
        </Hidden> */}
      </Wrapper>
    );
  }
}

Chats.propTypes = {
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withRouter(Chats);
