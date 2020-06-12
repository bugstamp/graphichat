import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../../../../common/SearchBox';
import SearchDialogList from './SearchDialogList';

import { SearchDialogContentStyled } from './styled';

import { contactProps, userInfoProps } from '../../../../propTypes';

const SearchDialogContent = (props) => {
  const {
    searchValue,
    onChangeSearchValue,
    loading,
    adding,
    users,
    myContacts,
    selectedUserId,
    toggleConfirmDialog,
  } = props;

  return (
    <SearchDialogContentStyled dividers>
      <SearchBox
        value={searchValue}
        onChange={onChangeSearchValue}
        autoFocus
      />
      <SearchDialogList
        loading={loading}
        data={users}
        myContacts={myContacts}
        adding={adding}
        selectedUserId={selectedUserId}
        openConfirmDialog={toggleConfirmDialog}
      />
    </SearchDialogContentStyled>
  );
};

SearchDialogContent.defaultProps = {
  users: [],
  myContacts: [],
  selectedUserId: null,
};
SearchDialogContent.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  adding: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userInfoProps)),
  myContacts: PropTypes.arrayOf(PropTypes.shape(contactProps)),
  selectedUserId: PropTypes.string,
  toggleConfirmDialog: PropTypes.func.isRequired,
};

export default SearchDialogContent;
