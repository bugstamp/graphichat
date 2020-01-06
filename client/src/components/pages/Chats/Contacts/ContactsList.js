import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../../common/List';
import Contact from './Contact';
import NoContacts from './NoContacts';

import { getAvatar, messageDateParsers } from '../../../../helpers';

class ContactsList extends Component {
  rowRenderer = ({ rowIndex, rowData }) => {
    const {
      myId,
      selectedChatId,
      changeRoute,
      getLastChatMessage,
    } = this.props;
    const { chatId, userInfo } = rowData;
    const { displayName, status } = userInfo;
    const avatar = getAvatar(userInfo);
    const message = getLastChatMessage(chatId);
    const { senderId, content, time } = message;
    const parsedTime = messageDateParsers.messageTime(time);

    const isSelected = selectedChatId === chatId;
    const online = status === 'ONLINE';
    const isMyMessage = senderId === myId;
    const messageText = isMyMessage
      ? `You: ${content}`
      : content;

    return (
      <Contact
        key={rowIndex}
        myId={myId}
        avatar={avatar}
        displayName={displayName}
        message={messageText}
        time={parsedTime}
        online={online}
        isSelected={isSelected}
        onSelect={() => changeRoute(chatId)}
      />
    );
  }

  render() {
    const { loading, data, searchValue } = this.props;

    return (
      <List
        loading={loading}
        data={data}
        rowRenderer={this.rowRenderer}
        noContentComponent={() => (<NoContacts searchValue={searchValue} />)}
        spinnerSize={40}
        listProps={{ gutters: 2, disablePadding: true }}
      />
    );
  }
}

ContactsList.defaultProps = {
  myId: null,
  selectedChatId: null,
};
ContactsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  myId: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  selectedChatId: PropTypes.string,
  changeRoute: PropTypes.func.isRequired,
  getLastChatMessage: PropTypes.func.isRequired,
};

export default ContactsList;
