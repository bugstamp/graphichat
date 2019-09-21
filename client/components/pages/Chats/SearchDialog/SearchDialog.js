import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import SearchDialogContainer from '../../../containers/SearchDialogContainer';
import SearchBox from '../../../common/SearchBox';
import ResponsiveDialog from '../../../common/ResponsiveDialog';
import SearchDialogList from './SearchDialogList';

import { getStyledProps } from '../../../../styles';

const DialogBody = styled.div`
  && {
    display: flex;
    flex-flow: column;
    background-color: #fff;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const borderRadius = getStyledProps('theme.shape.borderRadius')(props);
    const shadows = getStyledProps('theme.shadows[1]')(props);
    const mdUp = breakpoints.up('md');

    return `
      ${mdUp} {
        min-height: 500px;
        border-radius: ${borderRadius}px;
        box-shadow: ${shadows};
      }
    `;
  }}
  }
`;

const SearchDialogContentInner = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
`;

const SearchDialogTitle = styled(DialogTitle)`
  && {
  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
  }
`;

const SearchDialogContent = styled(DialogContent)`
  && {
    flex: 1 auto;
    display: flex;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
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
        if (value !== '@') {
          refetch();
        }
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
          skip: !searchValue || searchValue === '@',
        }}
      >
        {({
          searchUsers: {
            loading,
            data,
            refetch,
          },
          createChat: {
            mutation: createChat,
            result: { loading: adding },
          },
          getMyContacts: {
            data: { myContacts },
          },
        }) => {
          return (
            <Fragment>
              <ResponsiveDialog
                open={open}
                toggle={toggle}
                PaperComponent={DialogBody}
              >
                <SearchDialogTitle disableTypography>
                  <Typography variant="h6">
                    Search user
                  </Typography>
                  <Typography variant="subtitle2">
                    Search user by name or use &quot;@&quot; as a first character for searching by username.
                  </Typography>
                </SearchDialogTitle>
                <SearchDialogContent dividers>
                  <SearchDialogContentInner>
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
                  </SearchDialogContentInner>
                </SearchDialogContent>
                <DialogActions>
                  <Button onClick={toggle} color="primary">Close</Button>
                </DialogActions>
              </ResponsiveDialog>
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
};

export default SearchDialog;
