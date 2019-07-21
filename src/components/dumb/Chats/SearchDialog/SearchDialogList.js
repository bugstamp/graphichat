import React, { Component } from 'react';
import { find } from 'lodash';

import List from '../../../common/List';
import SearchDialogListItem from './SearchDialogListItem';

import { getAvatar } from '../../../../helpers';

class SearchDialogList extends Component {
  rowRenderer = ({ rowIndex, rowData }) => {
    const {
      loading,
      myContacts,
      adding,
      selectedUserId,
      openConfirmDialog,
    } = this.props;
    const { id, displayName, username } = rowData;
    const isAdding = adding && selectedUserId === id;
    const isAdded = !!find(myContacts, ({ userInfo }) => userInfo.id === id);
    const avatar = getAvatar(rowData);
    const usernameText = `@${username}`;

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
      />
    );
  }
}

export default SearchDialogList;
