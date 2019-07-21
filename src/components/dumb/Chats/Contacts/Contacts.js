import React, { Component } from 'react';
import styled from 'styled-components';
import { size } from 'polished';
import { find, filter, upperCase } from 'lodash';

import Paper from '@material-ui/core/Paper';

import ListSearch from '../../../common/List/ListSearch';
import ContactsList from './ContactsList';
import ContactsFooter from './ContactsFooter';
import SearchDialog from '../SearchDialog';

import { getStyledProps, getSpacing } from '../../../../styles';

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

export const NoContactInfo = styled.div`
  ${size('100%')};
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }
`;

class ContactPanel extends Component {
  state = {
    searchDialog: false,
    searchValue: '',
  }

  toggleSearchDialog = () => {
    this.setState(({ searchDialog }) => ({ searchDialog: !searchDialog }));
  }

  onChangeSearchValue = (searchValue) => {
    this.setState({ searchValue });
  }

  sortContacts = () => {
    const { searchValue } = this.state;
    const { contacts } = this.props;

    return filter(contacts, ({ userInfo }) => {
      const upperName = upperCase(userInfo.displayName);
      const upperSearchValue = upperCase(searchValue);

      return upperName.indexOf(upperSearchValue) !== -1;
    });
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
    const { searchDialog, searchValue } = this.state;
    const {
      loading,
      me,
      selected,
      selectChat,
    } = this.props;
    const sortedContacts = this.sortContacts();

    return (
      <Wrapper square elevation={0}>
        <ListSearch searchValue={searchValue} onChange={this.onChangeSearchValue} />
        <ContactsList
          loading={loading}
          data={sortedContacts}
          myId={me.id}
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

export default ContactPanel;
