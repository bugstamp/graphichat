import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';

import { getStyledProps, getSpacing } from '../../../../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  margin-bottom: ${getSpacing(1)};
  color: ${getStyledProps('theme.palette.grey.600')};
  background-color: #fff;
  border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')}
`;

const SearchIconWrapper = styled.div`
  flex: 0 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledProps('theme.palette.primary.light')};
`;

const SearchInput = styled(InputBase)`
  && {
    flex: 1 auto;
    color: inherit;
  }
`;

const ListSearch = ({ value, onChange, autoFocus }) => (
  <Wrapper>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <SearchInput
      type="text"
      value={value}
      onChange={({ target }) => onChange(target.value)}
      placeholder="Search..."
      autoFocus={autoFocus}
    />
  </Wrapper>
);

ListSearch.defaultProps = {
  autoFocus: false,
};
ListSearch.props = {
  autoFocus: PropTypes.bool,
};

export default ListSearch;
