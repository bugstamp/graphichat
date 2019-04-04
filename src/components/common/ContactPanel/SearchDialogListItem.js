import React from 'react';
// import styled from 'styled-components';
// import {} from 'polished';

import AppListItem from './AppList/ListItem';
import AppListItemAvatar from './AppList/ListItemAvatar';
import AppListItemInfo from './AppList/ListItemInfo';

// import { getStyledProps, getSpacing } from '../../../styles';
import { getContactInitials } from '../../../helpers';

const SearchDialogListItem = ({
  avatar,
  firstName,
  lastName,
  fullName,
  login,
}) => {
  const avatarText = getContactInitials(firstName, lastName);
  const secondary = `@${login}`;

  return (
    <AppListItem>
      <AppListItemAvatar src={avatar} text={avatarText} online={false} />
      <AppListItemInfo primary={fullName} secondary={secondary} />
    </AppListItem>
  );
};

export default SearchDialogListItem;
