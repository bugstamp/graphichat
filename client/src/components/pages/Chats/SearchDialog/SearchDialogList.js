import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import List from '../../../common/List';
import SearchDialogListItem from './SearchDialogListItem';

import { getAvatar } from '../../../../helpers';
import { contactProps, userInfoProps } from '../../../propTypes';

class SearchDialogList extends Component {
  rowRenderer = ({ rowIndex, rowData }) => {
    const {
      myContacts,
      adding,
      selectedUserId,
      openConfirmDialog,
    } = this.props;
    const { id, displayName, username } = rowData;
    const isAdding = adding && selectedUserId === id;
    const isAdded = !!find(myContacts, ({ userInfo }) => userInfo.id === id);
    const avatar = getAvatar(rowData);
    const usernameText = username ? `@${username}` : '';

    return (
      <SearchDialogListItem
        key={rowIndex}
        displayName={displayName}
        username={usernameText}
        avatar={avatar}
        isAdding={isAdding}
        isAdded={isAdded}
        onClick={() => openConfirmDialog(rowData)}
      />
    );
  }

  render() {
    const { loading, data } = this.props;

    return (
      <List
        loading={loading}
        data={data}
        rowRenderer={this.rowRenderer}
        lisProps={{ gutters: 2, disablePadding: true }}
      />
    );
  }
}

SearchDialogList.defaultProps = {
  selectedUserId: null,
  myContacts: [],
  data: [],
};
SearchDialogList.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(userInfoProps)),
  myContacts: PropTypes.arrayOf(PropTypes.shape(contactProps)),
  adding: PropTypes.bool.isRequired,
  selectedUserId: PropTypes.string,
  openConfirmDialog: PropTypes.func.isRequired,
};

export default SearchDialogList;
