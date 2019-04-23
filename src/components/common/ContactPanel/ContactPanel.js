import React, { Component } from 'react';
import styled from 'styled-components';
import { size } from 'polished';
import { map, isEmpty } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

const NoContactInfo = styled.div`
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
  }

  toggleSearchDialog = () => {
    this.setState(({ searchDialog }) => ({ searchDialog: !searchDialog }));
  }

  render() {
    const { searchDialog } = this.state;
    const { contacts } = this.props;

    return (
      <Wrapper square elevation={0}>
        <ListSearch />
        <AppList>
          <Choose>
            <When condition={isEmpty(contacts)}>
              <NoContactInfo>
                <Typography variant="subtitle2">
                  <p>Your contact list is empty.</p>
                  <p>Click on the "plus" icon to find your contacts</p>
                </Typography>
              </NoContactInfo>
            </When>
            <Otherwise>
              {map(contacts, ({ person, messages }) => {
                const { id } = person;

                return (<ContactPanelItem key={id} contact={person} message={messages[0]} />);
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
