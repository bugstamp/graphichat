import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

const ChatPlaceholderStyled = styled.div`
  flex: 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatPlaceholder = (props) => {
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
        <ChatPlaceholderStyled>
          <If condition={unselectedText}>
            <Typography variant="subtitle2">
              {unselectedText}
            </Typography>
          </If>
        </ChatPlaceholderStyled>
      </When>
      <Otherwise>
        {children}
      </Otherwise>
    </Choose>
  );
};

ChatPlaceholder.defaultProps = {
  selectedChatId: null,
  chatId: null,
  myId: null,
};
ChatPlaceholder.propTypes = {
  selectedChatId: PropTypes.string,
  chatId: PropTypes.string,
  myId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node]).isRequired,
};

export default ChatPlaceholder;
