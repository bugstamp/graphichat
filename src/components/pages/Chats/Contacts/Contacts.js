import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  find, filter, upperCase, isEqual,
} from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  }
`;

const ContactsHeader = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${getSpacing(2)};

  h6 {
    margin-bottom: ${getSpacing(1)};
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
    const { selectedChatId, selectChat, contacts } = this.props;

    if (!isEqual(prevProps.selectedChatId, selectedChatId)) {
      selectChat({ variables: { chatId: selectedChatId } });
    }

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
    } = this.props;

    return (
      <Wrapper square elevation={0}>
        <ContactsHeader>
          <Typography variant="h6" align="center" color="primary">{title}</Typography>
          <SearchBox value={searchValue} onChange={this.onChangeSearchValue} />
        </ContactsHeader>
        <ContactsList
          loading={loading}
          data={sortedContacts}
          myId={myId}
          searchValue={searchValue}
          selectedChatId={selectedChatId}
          changeRoute={changeRoute}
          getLastChatMessage={this.getLastChatMessage}
        />
        <ContactsFooter toggleSearchDialog={this.toggleSearchDialog} />
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
  selectChat: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

export default Contacts;
