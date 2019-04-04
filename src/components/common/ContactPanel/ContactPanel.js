import React, { Component } from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

import Paper from '@material-ui/core/Paper';

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

const contacts = [
  {
    id: 12312,
    avatar: '',
    firstName: 'Kiril',
    lastName: 'Grischenko',
    fullName: 'Kiril Grischenko',
    message: 'You: Hi!',
    messageTime: '12:17 pm',
    noSeen: 10,
  },
];

class ContactPanel extends Component {
  state = {
    searchDialog: false,
  }

  toggleSearchDialog = () => {
    this.setState(({ searchDialog }) => ({ searchDialog: !searchDialog }));
  }

  render() {
    const { searchDialog } = this.state;

    return (
      <Wrapper square elevation={0}>
        <ListSearch />
        <AppList>
          {map(contacts, (contact) => {
            const { id } = contact;

            return (<ContactPanelItem key={id} {...contact} />);
          })}
        </AppList>
        <ContactPanelFooter toggleSearchDialog={this.toggleSearchDialog} />
        <SearchDialog open={searchDialog} toggle={this.toggleSearchDialog} />
      </Wrapper>
    );
  }
}

export default ContactPanel;
