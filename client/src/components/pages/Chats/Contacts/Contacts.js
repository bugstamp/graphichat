import React, { useState, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { upperCase } from 'lodash';
import history from 'appHistory';

import Hidden from '@material-ui/core/Hidden';

import ContactsHeader from './ContactsHeader/ContactsHeader';
import ContactsList from './ContactsList';
import ContactsFooter from './ContactsFooter/ContactsFooter';
import SearchDialog from '../SearchDialog';

import { ContactsStyled } from './styled';

import gql from '../../../../gql';

const { GET_ME, GET_MY_CHATS } = gql;

const Contacts = () => {
  const [searchDialog, setSearchDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { search } = useLocation();
  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const { loading, data: { myContacts = [], myChats = [] } = {} } = useQuery(GET_MY_CHATS);
  const { chatId: selectedChatId } = queryString.parse(search);
  const { id } = me;

  const toggleSearchDialog = useCallback(() => {
    setSearchDialog(!searchDialog);
  }, [searchDialog]);

  const onChangeSearchValue = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const getLastChatMessage = useCallback((chatId) => {
    if (myChats.length) {
      const chat = myChats.find(c => c.id === chatId);

      if (chat) {
        const { messages } = chat;

        return messages[messages.length - 1];
      }
      return null;
    }
    return null;
  }, [myChats]);

  const sortData = useCallback((data) => {
    if (searchValue) {
      return data.filter(({ userInfo }) => {
        const upperName = upperCase(userInfo.displayName);
        const upperSearchValue = upperCase(searchValue);

        return upperName.indexOf(upperSearchValue) !== -1;
      });
    }
    return data;
  }, [searchValue]);

  const handleSelectChat = useCallback((chatId) => {
    if (selectedChatId !== chatId) {
      history.push(`/chats?chatId=${chatId}`);
    }
  }, [selectedChatId]);

  return (
    <ContactsStyled square elevation={0}>
      <ContactsHeader
        title="Chats"
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        toggleSearchDialog={toggleSearchDialog}
      />
      <ContactsList
        loading={loading}
        data={sortData(myContacts)}
        myId={id}
        searchValue={searchValue}
        selectedChatId={selectedChatId}
        selectChat={handleSelectChat}
        getLastChatMessage={getLastChatMessage}
      />
      <Hidden smDown implementation="css">
        <ContactsFooter toggleSearchDialog={toggleSearchDialog} />
      </Hidden>
      <SearchDialog open={searchDialog} toggle={toggleSearchDialog} />
    </ContactsStyled>
  );
};

Contacts.propTypes = {};

export default memo(Contacts);
