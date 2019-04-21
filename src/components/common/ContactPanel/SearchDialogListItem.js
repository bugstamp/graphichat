import React from 'react';
// import styled from 'styled-components';
// import {} from 'polished';

import AppListItem from './AppList/ListItem';
import AppListItemAvatar from './AppList/ListItemAvatar';
import AppListItemInfo from './AppList/ListItemInfo';

// import { getStyledProps, getSpacing } from '../../../styles';
import { getContactInitials } from '../../../helpers';

const SearchDialogListItem = ({
  id,
  avatar,
  firstName,
  lastName,
  displayName,
  username,
}) => {
  const avatarText = getContactInitials(firstName, lastName);
  const secondary = `@${username}`;

  return (
    <AppListItem onClick={() => console.log(id)}>
      <AppListItemAvatar src={avatar} text={avatarText} online={false} />
      <AppListItemInfo primary={displayName} secondary={secondary} />
    </AppListItem>
  );
};

export default SearchDialogListItem;
