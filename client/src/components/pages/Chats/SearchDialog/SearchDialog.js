import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import ResponsiveDialog from '../../../common/ResponsiveDialog';
import SearchDialogTitle from './Title/SearchDialogTitle';
import SearchDialogContent from './Content/SearchDialogContent';
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog';

import { SearchDialogBodyStyled } from './styled';
import gql from '../../../../gql';
import { chatCreatedUpdate } from '../../../../gql/updates/chat';

const {
  SEARCH_USERS,
  CREATE_CHAT,
  GET_MY_CONTACTS,
} = gql;

const SearchDialog = (props) => {
  const { open, toggle } = props;
  const [searchValue, setSearchValue] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [user, setUser] = useState({});
  const { id: selectedUserId, displayName } = user;

  const { data: getMyContactsData = {} } = useQuery(GET_MY_CONTACTS);
  const { loading, data: searchUsersData = {}, refetch } = useQuery(SEARCH_USERS, {
    skip: !searchValue || searchValue === '@',
    variables: { searchValue },
    notifyOnNetworkStatusChange: true,
  });
  const [createChat, { loading: adding }] = useMutation(CREATE_CHAT, {
    update: chatCreatedUpdate,
  });
  const { myContacts } = getMyContactsData;
  const { searchUsers = [] } = searchUsersData;

  const onChangeSearchValue = useCallback((value) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (searchValue && searchValue !== '@') {
      refetch();
    }
  }, [searchValue, refetch]);

  const toggleConfirmDialog = useCallback((selectedUser) => {
    setConfirmDialog(!confirmDialog);

    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [confirmDialog, setConfirmDialog, setUser]);

  const handleCreateChat = useCallback(() => {
    createChat({ variables: { userId: user.id } });
    toggleConfirmDialog();
  }, [user, createChat, toggleConfirmDialog]);

  return (
    <Fragment>
      <ResponsiveDialog
        open={open}
        toggle={toggle}
        PaperComponent={SearchDialogBodyStyled}
      >
        <SearchDialogTitle />
        <SearchDialogContent
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          loading={loading}
          users={searchUsers}
          adding={adding}
          myContacts={myContacts}
          selectedUserId={selectedUserId}
          toggleConfirmDialog={toggleConfirmDialog}
        />
        <DialogActions>
          <Button onClick={toggle} color="primary">Close</Button>
        </DialogActions>
      </ResponsiveDialog>
      <ConfirmationDialog
        isOpen={confirmDialog}
        toggle={toggle}
        toggleConfirmDialog={toggleConfirmDialog}
        displayName={displayName}
        onConfirm={handleCreateChat}
      />
    </Fragment>
  );
};

SearchDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default memo(SearchDialog);
