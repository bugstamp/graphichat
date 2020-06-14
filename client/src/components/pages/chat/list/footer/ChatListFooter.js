import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { ChatListFooterStyled } from './styled';

const ChatFooter = ({ toggleSearchDialog }) => {
  return (
    <ChatListFooterStyled>
      <Fab
        color="primary"
        variant="extended"
        size="medium"
        onClick={toggleSearchDialog}
      >
        <AddIcon />
        Chat
      </Fab>
    </ChatListFooterStyled>
  );
};

ChatFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ChatFooter;
