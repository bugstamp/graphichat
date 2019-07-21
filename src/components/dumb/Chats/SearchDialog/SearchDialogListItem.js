import React from 'react';
// import styled from 'styled-components';
// import {} from 'polished';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/DoneRounded';

import AppListItem from '../../../common/ContactPanel/AppList/ListItem';
import AppListItemAvatar from '../../../common/ContactPanel/AppList/ListItemAvatar';
import AppListItemInfo from '../../../common/ContactPanel/AppList/ListItemInfo';

const SearchDialogListItem = ({
  avatar,
  displayName,
  username,
  isAdding,
  isAdded,
  onClick,
}) => {
  return (
    <AppListItem>
      <AppListItemAvatar {...avatar} online={false} />
      <AppListItemInfo primary={displayName} secondary={username} />
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={onClick}
        disabled={isAdded}
      >
        <Choose>
          <When condition={isAdding}>
            <CircularProgress size={20} color="inherit" />
          </When>
          <When condition={isAdded}>
            <DoneIcon />
          </When>
          <Otherwise>
            Add
          </Otherwise>
        </Choose>
      </Button>
    </AppListItem>
  );
};

export default SearchDialogListItem;
