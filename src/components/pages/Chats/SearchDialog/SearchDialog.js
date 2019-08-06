import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MaterialDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import SearchDialogContainer from '../../../containers/SearchDialogContainer';
import SearchBox from '../../../common/SearchBox';
import SearchDialogList from './SearchDialogList';

import { getSpacing, getStyledProps } from '../../../../styles';

const DialogInner = styled.div`
  height: 500px;
  display: flex;
  flex-flow: column;
  padding: ${getSpacing(2)};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        height: 100%;
      }
    `;
  }}
`;

const DialogTitle = styled.div`
  padding: 0;
  padding-bottom: ${getSpacing(1)};
`;

const DialogContent = styled(MaterialDialogContent)`
  && {
    flex: 1 auto;
    display: flex;
    flex-flow: column;
    padding: 0;
  }
`;

const SearchDialogActions = styled(DialogActions)`
  && {
    padding: 0;
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
    const { open, toggle, width } = this.props;
    const fullScreen = !isWidthUp('md', width);

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
              <Dialog
                open={open}
                onClose={toggle}
                scroll="body"
                fullScreen={fullScreen}
              >
                <DialogInner>
                  <DialogTitle>
                    <Typography variant="h6" gutterBottom>
                      Search contact
                    </Typography>
                    <Typography variant="subtitle2">
                      Search contact by name or use &quot;@&quot; as a first character for searching by username.
                    </Typography>
                  </DialogTitle>
                  <DialogContent>
                    <SearchBox
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
                  <SearchDialogActions>
                    <Button onClick={toggle} color="primary">Close</Button>
                  </SearchDialogActions>
                </DialogInner>
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

SearchDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(SearchDialog);
