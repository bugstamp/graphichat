import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  find, filter, upperCase, isEqual,
} from 'lodash';

import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsFooter from './ContactsFooter';
import SearchDialog from '../SearchDialog';
import Navigation from '../../../common/Navigation/Navigation';

import { getStyledProps } from '../../../../styles';
import { contactProps, chatProps } from '../../../propTypes';

const Wrapper = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.background.default')};
  }
`;

class Contacts extends Component {
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
      title,
      loading,
      myId,
      selectedChatId,
      changeRoute,
      toggleSettingsDialog,
      signOut,
    } = this.props;

    return (
      <Wrapper square elevation={0}>
        <ContactsHeader
          title={title}
          searchValue={searchValue}
          onChangeSearchValue={this.onChangeSearchValue}
          toggleSearchDialog={this.toggleSearchDialog}
        />
        <ContactsList
          loading={loading}
          data={sortedContacts}
          myId={myId}
          searchValue={searchValue}
          selectedChatId={selectedChatId}
          changeRoute={changeRoute}
          getLastChatMessage={this.getLastChatMessage}
        />
        <Hidden smDown>
          <ContactsFooter toggleSearchDialog={this.toggleSearchDialog} />
        </Hidden>
        <Hidden mdUp>
          <Navigation
            variant="horizontal"
            toggleSettingsDialog={toggleSettingsDialog}
            signOut={signOut}
          />
        </Hidden>
        <SearchDialog open={searchDialog} toggle={this.toggleSearchDialog} />
      </Wrapper>
    );
  }
}

Contacts.defaultProps = {
  myId: null,
  selectedChatId: null,
  contacts: [],
  chats: [],
};
Contacts.propTypes = {
  loading: PropTypes.bool.isRequired,
  myId: PropTypes.string,
  selectedChatId: PropTypes.string,
  contacts: PropTypes.arrayOf(PropTypes.shape(contactProps)),
  chats: PropTypes.arrayOf(PropTypes.shape(chatProps)),
  changeRoute: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Contacts;
