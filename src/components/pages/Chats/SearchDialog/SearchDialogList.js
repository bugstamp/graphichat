import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import List from '../../../common/List';
import SearchDialogListItem from './SearchDialogListItem';

import { getAvatar } from '../../../../helpers';

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

SearchDialogList.defaultProps = {
  selectedUserId: null,
};
SearchDialogList.propTypes = {
  loading: PropTypes.bool.isRequired,
  // data: PropTypes.func.isRequired,
  // myContacts: PropTypes.func.isRequired,
  adding: PropTypes.bool.isRequired,
  selectedUserId: PropTypes.string,
  openConfirmDialog: PropTypes.func.isRequired,
};

export default SearchDialogList;
