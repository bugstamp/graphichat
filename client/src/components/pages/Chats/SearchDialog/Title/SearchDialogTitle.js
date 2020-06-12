import React from 'react';

import Typography from '@material-ui/core/Typography';

import { SearchDialogTitleStyled } from './styled';

const SearchDialogTitle = () => (
  <SearchDialogTitleStyled disableTypography>
    <Typography variant="h6">
      Search user
    </Typography>
    <Typography variant="subtitle2">
      Search user by name or use &quot;@&quot; as a first character for searching by username.
    </Typography>
  </SearchDialogTitleStyled>
);

export default SearchDialogTitle;
