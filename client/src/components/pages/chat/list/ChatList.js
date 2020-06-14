import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'query-string';
import { upperCase } from 'lodash';
import history from 'appHistory';

import Hidden from '@material-ui/core/Hidden';

import ChatListHeader from './header';
import ChatListItems from './list';
import ChatListFooter from './footer';
import SearchDialog from './search';

import { ChatListStyled } from './styled';

import gql from '../../../../gql';

const { GET_ME, GET_MY_CHATS } = gql;

const ChatList = (props) => {
  const { loading } = props;
  const [searchDialog, setSearchDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { search } = useLocation();
  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const { data: { myContacts = [], myChats = [] } = {} } = useQuery(GET_MY_CHATS);

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
      history.push(`/?chatId=${chatId}`);
    }
  }, [selectedChatId]);

  return (
    <ChatListStyled square elevation={0}>
      <ChatListHeader
        title="Chats"
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        toggleSearchDialog={toggleSearchDialog}
      />
      <ChatListItems
        loading={loading}
        data={sortData(myContacts)}
        myId={id}
        searchValue={searchValue}
        selectedChatId={selectedChatId}
        selectChat={handleSelectChat}
        getLastChatMessage={getLastChatMessage}
      />
      <Hidden smDown implementation="css">
        <ChatListFooter toggleSearchDialog={toggleSearchDialog} />
      </Hidden>
      <SearchDialog open={searchDialog} toggle={toggleSearchDialog} />
    </ChatListStyled>
  );
};

ChatList.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default memo(ChatList);
