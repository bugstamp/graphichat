import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import history from 'appHistory';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Contacts from './Contacts';
import Chat from './Chat';
import FullWidthSwipeableDrawer from '../../common/FullWidthSwipeableDrawer';

import { ChatsStyled } from './styled';

const Chats = (props) => {
  const { location } = props;
  const { search } = location;
  const { chatId: selectedChatId } = queryString.parse(search);

  const handleOnClose = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <ChatsStyled>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4}>
          <Contacts />
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
          onClose={handleOnClose}
        >
          <Chat />
        </FullWidthSwipeableDrawer>
      </Hidden>
    </ChatsStyled>
  );
};

Chats.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(Chats);
