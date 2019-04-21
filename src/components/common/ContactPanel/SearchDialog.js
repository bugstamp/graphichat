import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchDialogContainer from '../../smart/SearchDialogContainer';

import ListSearch from './AppList/ListSearch';
import List from './AppList/List';
import SearchDialogListItem from './SearchDialogListItem';

import { getSpacing } from '../../../styles';

const ListWrapper = styled.div`
  height: 200px;
  display: flex;
`;

const SubTitle = styled(Typography)`
  && {
    padding: 0 ${getSpacing(3)};
    padding-bottom: ${getSpacing(1)};
  }
`;

const ProgressWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class SearchDialog extends PureComponent {
  state = {
    searchValue: '',
    confirmDialog: false,
    selectedUser: {},
  }

  onChangeSearchValue = (value, refetch) => {
    this.setState(
      () => ({ searchValue: value }),
      () => {
        refetch();
      },
    );
  }

  toggleConfirmDialog = (user = {}) => {
    this.setState(({ confirmDialog }) => ({
      confirmDialog: !confirmDialog,
      selectedUser: user,
    }));
  }

  render() {
    const { searchValue, confirmDialog, selectedUser } = this.state;
    const { open, toggle } = this.props;
    console.log(selectedUser);

    return (
      <SearchDialogContainer
        searchUsersProps={{
          variables: { searchValue },
          skip: !searchValue,
        }}
      >
        {({ searchUsers: { loading, data, refetch }, addContact }) => {
          console.log(addContact);
          return (
            <Fragment>
              <Dialog open={open} onClose={toggle} scroll="body">
                <DialogTitle>
                  Search contact
                </DialogTitle>
                <SubTitle variant="subtitle2">
                  Search contact by name or use "@" as a first character for searching by username.
                </SubTitle>
                <DialogContent>
                  <ListSearch
                    value={searchValue}
                    onChange={value => this.onChangeSearchValue(value, refetch)}
                  />
                  <ListWrapper>
                    <Choose>
                      <When condition={loading}>
                        <ProgressWrapper>
                          <CircularProgress size={20} />
                        </ProgressWrapper>
                      </When>
                      <When condition={!data}>
                        {null}
                      </When>
                      <Otherwise>
                        <List>
                          {map(data.searchUsers, (item) => {
                            const { id } = item;

                            return (
                              <SearchDialogListItem
                                key={id}
                                item={item}
                                openConfirmDialog={this.toggleConfirmDialog}
                              />
                            );
                          })}
                        </List>
                      </Otherwise>
                    </Choose>
                  </ListWrapper>
                </DialogContent>
                <DialogActions>
                  <Button onClick={toggle} color="primary">Close</Button>
                </DialogActions>
                {/* <DialogActions>
                  <Button onClick={toggle} color="primary">Cancel</Button>
                  <Button color="primary" disabled>Add</Button>
                </DialogActions> */}
              </Dialog>
              <If condition={confirmDialog}>
                <Dialog open={confirmDialog} onClose={toggle}>
                  <DialogTitle>Create chat with {selectedUser.displayName}?</DialogTitle>
                  <DialogActions>
                    <Button
                      color="primary"
                      size="small"
                      onClick={this.toggleConfirmDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => addContact.mutation({ variables: { userId: selectedUser.id } })}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </If>
            </Fragment>
          );
        }}
      </SearchDialogContainer>
    );
  }
}

export default SearchDialog;
