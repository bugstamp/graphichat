import React, { Component } from 'react';
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

class ListSearch extends Component {
  render() {
    return (
      <Wrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput type="text" placeholder="Search..." />
      </Wrapper>
    );
  }
}

export default ListSearch;
