import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import SearchDialogContainer from '../../../smart/SearchDialogContainer';
import ListSearch from '../../../common/List/ListSearch';
import SearchDialogList from './SearchDialogList';

import { getSpacing } from '../../../../styles';

const SubTitle = styled(Typography)`
  && {
    padding: 0 ${getSpacing(3)};
    padding-bottom: ${getSpacing(1)};
  }
`;

const DialogContent = styled(MaterialDialogContent)`
  && {
    height: 300px;
    display: flex;
    flex-flow: column;
  }
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

  openConfirmDialog = (user = {}) => {
    this.setState(({ confirmDialog }) => ({
      confirmDialog: !confirmDialog,
      selectedUser: user,
    }));
  }

  closeConfirmDialog = () => {
    this.setState(({ confirmDialog }) => ({
      confirmDialog: !confirmDialog,
    }));
  }

  render() {
    const { searchValue, confirmDialog, selectedUser } = this.state;
    const { open, toggle } = this.props;

    return (
      <SearchDialogContainer
        searchUsersProps={{
          variables: { searchValue },
          skip: !searchValue,
        }}
      >
        {({
          searchUsers: { loading, data, refetch },
          createChat: { mutation: createChat, result: { loading: adding } },
          getMyContacts: { data: { myContacts } },
        }) => {
          return (
            <Fragment>
              <Dialog open={open} onClose={toggle} scroll="body">
                <DialogTitle>
                  Search contact
                </DialogTitle>
                <SubTitle variant="subtitle2">
                  Search contact by name or use &quot;@&quot; as a first character for searching by username.
                </SubTitle>
                <DialogContent>
                  <ListSearch
                    value={searchValue}
                    onChange={value => this.onChangeSearchValue(value, refetch)}
                    autoFocus
                  />
                  <SearchDialogList
                    loading={loading}
                    data={data && data.searchUsers}
                    myContacts={myContacts}
                    adding={adding}
                    selectedUserId={selectedUser.id}
                    openConfirmDialog={this.openConfirmDialog}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={toggle} color="primary">Close</Button>
                </DialogActions>
              </Dialog>
              <If condition={confirmDialog}>
                <Dialog open={confirmDialog} onClose={toggle}>
                  <DialogTitle>{`Create chat with ${selectedUser.displayName}?`}</DialogTitle>
                  <DialogActions>
                    <Button
                      color="primary"
                      size="small"
                      onClick={this.closeConfirmDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        createChat({ variables: { userId: selectedUser.id } });
                        this.closeConfirmDialog();
                      }}
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
