import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { upperCase } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';
import queryString from 'query-string';

import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import grey from '@material-ui/core/colors/grey';

import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsFooter from './ContactsFooter';
import SearchDialog from '../SearchDialog';
import Navigation from '../../../common/Navigation/Navigation';

import gql from '../../../../gql';
import { getStyledProps } from '../../../../styles';

const {
  GET_ME,
  GET_MY_CHATS,
  SELECT_CHAT,
  GET_SELECTED_CHAT,
} = gql;

const ChatsStyled = styled(Paper)`
  && {
    position: relative;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.background.default')};
    border-left: 1px solid ${grey[200]};
    border-right: 1px solid ${grey[200]};
  }
`;

const Chats = (props) => {
  const {
    location,
    history,
    toggleSettingsDialog,
    signOut,
  } = props;
  const [searchDialog, setSearchDialog] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { data: { me = {} } = {} } = useQuery(GET_ME);
  const { loading, data: { myContacts = [], myChats = [] } = {} } = useQuery(GET_MY_CHATS);
  const { data: { selectedChat = {} } = {} } = useQuery(GET_SELECTED_CHAT);
  const [selectChat] = useMutation(SELECT_CHAT, {
    onCompleted({ selectChat: selectChatResult }) {
      if (selectChatResult) {
        const { id } = selectChatResult;

        history.push(`/chats?chatId=${id}`);
      }
    },
  });
  const { search } = location;
  const { id } = me;
  const { id: selectedChatId } = selectedChat;

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
    selectChat({ variables: { chatId } });
  }, [selectChat]);

  useEffect(() => {
    const { chatId } = queryString.parse(search);

    // Select chat if page load with chatId in the url
    if ((chatId && myChats.length) && !selectedChatId) {
      handleSelectChat(chatId);
    }
  }, [search, selectedChatId, myChats, handleSelectChat]);

  return (
    <ChatsStyled square elevation={0}>
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
      <Hidden mdUp implementation="css">
        <Navigation
          variant="horizontal"
          toggleSettingsDialog={toggleSettingsDialog}
          signOut={signOut}
        />
      </Hidden>
      <SearchDialog open={searchDialog} toggle={toggleSearchDialog} />
    </ChatsStyled>
  );
};

Chats.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withRouter(Chats);
