import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position, size } from 'polished';
import {
  find, filter, upperCase, isEqual,
} from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/MenuRounded';

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

const Title = styled.div`
  position: relative;

  h6 {
    margin-bottom: 0;
  }
`;

const NavButton = styled.button`
  && {
    ${size('24px')};
    ${position('absolute', '50%', null, null, 0)};
    min-height: auto;
    font-size: 24px;
    transform: translateY(-50%);
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    outline: none;
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
      toggleLeftNav,
    } = this.props;

    return (
      <Wrapper square elevation={0}>
        <ContactsHeader>
          <Title>
            <Hidden mdUp xsDown>
              <NavButton onClick={toggleLeftNav}>
                <MenuIcon color="primary" fontSize="inherit" />
              </NavButton>
            </Hidden>
            <Typography variant="h6" align="center" color="textPrimary">
              {title}
            </Typography>
          </Title>
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
