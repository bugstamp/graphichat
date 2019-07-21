import React from 'react';
import styled from 'styled-components';
// import {} from 'polished';

import MaterialListItem from '@material-ui/core/ListItem';

import { getSpacing } from '../../../styles';

const ListItemStyled = styled(MaterialListItem)`
  && {
    padding: 0 ${getSpacing(1)};
    margin-bottom: ${getSpacing(1)};
  }
`;

const ListItem = ({ children, onClick }) => {
  return (
    <ListItemStyled onClick={onClick}>
      {children}
    </ListItemStyled>
  );
};

export default ListItem;
