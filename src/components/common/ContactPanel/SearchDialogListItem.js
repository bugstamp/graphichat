import React from 'react';
// import styled from 'styled-components';
// import {} from 'polished';

import Button from '@material-ui/core/Button';

import AppListItem from './AppList/ListItem';
import AppListItemAvatar from './AppList/ListItemAvatar';
import AppListItemInfo from './AppList/ListItemInfo';

// import { getStyledProps, getSpacing } from '../../../styles';
import { getContactInitials } from '../../../helpers';

const SearchDialogListItem = ({
  item,
  openConfirmDialog,
}) => {
  const {
    avatar,
    firstName,
    lastName,
    displayName,
    username,
  } = item;
  const avatarText = getContactInitials(firstName, lastName);
  const secondary = `@${username}`;

  return (
    <AppListItem>
      <AppListItemAvatar src={avatar} text={avatarText} online={false} />
      <AppListItemInfo primary={displayName} secondary={secondary} />
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={() => openConfirmDialog(item)}
      >
        Add
      </Button>
    </AppListItem>
  );
};

export default SearchDialogListItem;
