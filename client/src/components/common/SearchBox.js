import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';

import { getStyledProps } from '../../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  color: ${getStyledProps('theme.palette.grey.600')};
  background-color: #fff;
  border-radius: ${getStyledProps('theme.shape.borderRadius')};
  box-shadow: ${getStyledProps('theme.shadows.1')};
`;

const IconWrapper = styled.div`
  flex: 0 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledProps('theme.palette.primary.light')};
`;

const Input = styled(InputBase)`
  && {
    flex: 1 auto;
    color: inherit;
  }
`;

const SearchBox = ({ value, onChange, autoFocus }) => (
  <Wrapper>
    <IconWrapper>
      <SearchIcon />
    </IconWrapper>
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
  </Wrapper>
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
