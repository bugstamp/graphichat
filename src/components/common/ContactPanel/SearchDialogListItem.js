import React from 'react';
// import styled from 'styled-components';
// import {} from 'polished';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/DoneRounded';

import AppListItem from './AppList/ListItem';
import AppListItemAvatar from './AppList/ListItemAvatar';
import AppListItemInfo from './AppList/ListItemInfo';

// import { getStyledProps, getSpacing } from '../../../styles';
import { getAvatarInitials } from '../../../helpers';

const SearchDialogListItem = ({
  item,
  openConfirmDialog,
  adding,
  added,
}) => {
  const { avatar, displayName, username } = item;
  const avatarText = getAvatarInitials(item);
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
        disabled={added}
      >
        <Choose>
          <When condition={adding}>
            <CircularProgress size={20} color="inherit" />
          </When>
          <When condition={added}>
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
