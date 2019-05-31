import React, { Component } from 'react';
import styled from 'styled-components';
import { size } from 'polished';
import {
  map, isEmpty, find, filter, upperCase,
} from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListSearch from './AppList/ListSearch';
import AppList from './AppList/List';
import ContactPanelItem from './ContactPanelItem';
import ContactPanelFooter from './ContactPanelFooter';
import SearchDialog from './SearchDialog';

import { getStyledProps, getSpacing } from '../../../styles';

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

  render() {
    const { searchDialog, searchValue } = this.state;
    const {
      loading,
      me,
      contacts,
      chats,
      selected,
      selectChat,
    } = this.props;
    const sortedContacts = this.sortContacts();

    return (
      <Wrapper square elevation={0}>
        <ListSearch searchValue={searchValue} onChange={this.onChangeSearchValue} />
        <AppList>
          <Choose>
            <When condition={isEmpty(contacts)}>
              <NoContactInfo>
                <Choose>
                  <When condition={loading}>
                    <CircularProgress color="primary" />
                  </When>
                  <Otherwise>
                    <Typography variant="subtitle2">
                      <p>Your contact list is empty.</p>
                      <p>Click on the "+" icon to find your contacts</p>
                    </Typography>
                  </Otherwise>
                </Choose>
              </NoContactInfo>
            </When>
            <Otherwise>
              {map(sortedContacts, ({ chatId, userInfo }) => {
                const { id } = userInfo;
                const { messages } = find(chats, { id: chatId });

                return (
                  <ContactPanelItem
                    key={id}
                    myId={me.id}
                    contact={userInfo}
                    message={messages[messages.length - 1]}
                    isSelected={selected === chatId}
                    onSelect={() => selectChat(chatId)}
                  />
                );
              })}
            </Otherwise>
          </Choose>
        </AppList>
        <ContactPanelFooter toggleSearchDialog={this.toggleSearchDialog} />
        <If condition={searchDialog}>
          <SearchDialog open={searchDialog} toggle={this.toggleSearchDialog} />
        </If>
      </Wrapper>
    );
  }
}

export default ContactPanel;
