import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import { size } from 'polished';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Contacts from './Contacts';
import Chat from './Chat';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';

const Wrapper = styled.div`
  && {
    ${size('100%')};
    display: flex;
    align-items: stretch;
  }
`;

const Chats = (props) => {
  const {
    location,
    toggleSettingsDialog,
    signOut,
  } = props;
  const { search } = location;
  const { chatId: selectedChatId } = queryString.parse(search);

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
      <Hidden mdUp>
        <FullWidthSwipeableDrawer
          open={!!selectedChatId}
          onClose={() => {
            history.goBack();
          }}
        >
          <Chat />
        </FullWidthSwipeableDrawer>
      </Hidden>
    </Wrapper>
  );
};

Chats.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withRouter(Chats);
