import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  find, filter, upperCase, isEqual,
} from 'lodash';

import Paper from '@material-ui/core/Paper';

import SearchBox from '../../../common/SearchBox';
import ContactsList from './ContactsList';
import ContactsFooter from './ContactsFooter';
import SearchDialog from '../SearchDialog';

import { getStyledProps, getSpacing } from '../../../../styles';
import { contactProps, chatProps } from '../../../propTypes';

const Wrapper = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.background.default')};
    padding: ${getSpacing(2)};
    padding-top: ${getSpacing(3)};
  }
`;

class ContactPanel extends Component {
  state = {
    searchDialog: false,
    searchValue: '',
    sortedContacts: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.state;
    const { contacts } = this.props;

    if (
      !isEqual(prevState.searchValue, searchValue)
      ||
      !isEqual(prevProps.contacts, contacts)
    ) {
      this.sortContacts(contacts, searchValue);
    }
  }

  toggleSearchDialog = () => {
    this.setState(({ searchDialog }) => ({ searchDialog: !searchDialog }));
  }

  onChangeSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  sortContacts = (contacts, searchValue) => {
    const sortedContacts = filter(contacts, ({ userInfo }) => {
      const upperName = upperCase(userInfo.displayName);
      const upperSearchValue = upperCase(searchValue);

      return upperName.indexOf(upperSearchValue) !== -1;
    });

    this.setState({ sortedContacts });
  }

  getLastChatMessage = (chatId) => {
    const { chats } = this.props;
    const chat = find(chats, { id: chatId });

    if (chat) {
      const { messages } = chat;

      return messages[messages.length - 1];
    }
    return {};
  }

  render() {
    const { searchDialog, searchValue, sortedContacts } = this.state;
    const {
      loading,
      myId,
      selected,
      selectChat,
    } = this.props;

    return (
      <Wrapper square elevation={0}>
        <SearchBox value={searchValue} onChange={this.onChangeSearchValue} />
        <ContactsList
          loading={loading}
          data={sortedContacts}
          myId={myId}
          searchValue={searchValue}
          selectedChat={selected}
          selectChat={selectChat}
          getLastChatMessage={this.getLastChatMessage}
        />
        <ContactsFooter toggleSearchDialog={this.toggleSearchDialog} />
        <SearchDialog open={searchDialog} toggle={this.toggleSearchDialog} />
      </Wrapper>
    );
  }
}

ContactPanel.defaultProps = {
  myId: null,
  selected: null,
  contacts: [],
  chats: [],
};
ContactPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  myId: PropTypes.string,
  selected: PropTypes.string,
  contacts: PropTypes.arrayOf(PropTypes.shape(contactProps)),
  chats: PropTypes.arrayOf(PropTypes.shape(chatProps)),
  selectChat: PropTypes.func.isRequired,
};

export default ContactPanel;
