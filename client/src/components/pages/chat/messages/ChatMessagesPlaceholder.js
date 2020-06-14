import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { ChatMessagesPlaceholderStyled } from './styled';

const ChatMessagesPlaceholder = (props) => {
  const {
    selectedChatId,
    chatId,
    myId,
    children,
  } = props;

  let unselectedText = '';
  if (!selectedChatId) {
    unselectedText = 'Please select a chat to start messaging';
  } else if (!chatId) {
    unselectedText = 'Selected chat is undefined';
  }

  return (
    <Choose>
      <When condition={!myId}>
        {null}
      </When>
      <When condition={unselectedText}>
        <ChatMessagesPlaceholderStyled>
          <If condition={unselectedText}>
            <Typography variant="subtitle2">
              {unselectedText}
            </Typography>
          </If>
        </ChatMessagesPlaceholderStyled>
      </When>
      <Otherwise>
        {children}
      </Otherwise>
    </Choose>
  );
};

ChatMessagesPlaceholder.defaultProps = {
  selectedChatId: null,
  chatId: null,
  myId: null,
};
ChatMessagesPlaceholder.propTypes = {
  selectedChatId: PropTypes.string,
  chatId: PropTypes.string,
  myId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]).isRequired,
};

export default ChatMessagesPlaceholder;
