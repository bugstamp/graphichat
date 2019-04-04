import React from 'react';
import styled from 'styled-components';
// import {} from 'polished';

import ListItem from '@material-ui/core/ListItem';

import { getSpacing } from '../../../../styles';

const ListItemStyled = styled(ListItem)`
  && {
    padding: 0 ${getSpacing(1)};
  }
`;

const AppListItem = ({ children }) => {
  return (
    <ListItemStyled>
      {children}
    </ListItemStyled>
  );
};

export default AppListItem;
