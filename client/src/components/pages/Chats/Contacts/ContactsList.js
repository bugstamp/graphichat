import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import List from '../../../common/List';
import Contact from './Contact';
import NoContacts from './NoContacts';

import { getAvatar, messageDateParsers } from '../../../../helpers';

const ContactList = (props) => {
  const {
    loading,
    data,
    searchValue,
    myId,
    selectedChatId,
    selectChat,
    getLastChatMessage,
  } = props;

  const rowRenderer = useCallback(({ rowIndex, rowData }) => {
    const { chatId, userInfo } = rowData;
    const { displayName, status } = userInfo;
    const avatar = getAvatar(userInfo);
    const message = getLastChatMessage(chatId);
    const { senderId, content, time } = message;
    const parsedTime = messageDateParsers.messageTime(time);

    const isOnline = status === 'ONLINE';
    const isSelected = selectedChatId === chatId;
    const isMyMessage = senderId === myId;
    const messageText = isMyMessage
      ? `You: ${content}`
      : content;

    return (
      <Contact
        key={rowIndex}
        myId={myId}
        chatId={chatId}
        avatar={avatar}
        displayName={displayName}
        message={messageText}
        time={parsedTime}
        online={isOnline}
        isSelected={isSelected}
        onSelect={selectChat}
      />
    );
  }, [myId, selectedChatId, selectChat, getLastChatMessage]);

  const noContentComponent = useCallback(
    () => <NoContacts searchValue={searchValue} />,
    [searchValue],
  );

  return (
    <List
      loading={loading}
      data={data}
      rowRenderer={rowRenderer}
      noContentComponent={noContentComponent}
    />
  );
};

ContactList.defaultProps = {
  myId: null,
  selectedChatId: null,
};
ContactList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  myId: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  selectedChatId: PropTypes.string,
  selectChat: PropTypes.func.isRequired,
  getLastChatMessage: PropTypes.func.isRequired,
};

export default ContactList;
