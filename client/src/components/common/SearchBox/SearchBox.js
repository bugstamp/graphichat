import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/SearchRounded';

import { SearchBoxStyled, SearchIconWrapper, Input } from './styled';

const SearchBox = ({ value, onChange, autoFocus }) => (
  <SearchBoxStyled>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <Input
      type="text"
      name="search"
      value={value}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Search..."
      autoFocus={autoFocus}
      inputProps={{
        'aria-label': 'Search Chat',
      }}
    />
  </SearchBoxStyled>
);

SearchBox.defaultProps = {
  autoFocus: false,
};
SearchBox.propTypes = {
  autoFocus: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
