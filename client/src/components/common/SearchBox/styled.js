import styled from 'styled-components';

import InputBase from '@material-ui/core/InputBase';

import { getStyledProps } from '../../../styles';

export const SearchBoxStyled = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  color: ${getStyledProps('theme.palette.grey.600')};
  background-color: #fff;
  border-radius: ${getStyledProps('theme.shape.borderRadius')};
  box-shadow: ${getStyledProps('theme.shadows.1')};
`;

export const SearchIconWrapper = styled.div`
  flex: 0 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledProps('theme.palette.primary.light')};
`;

export const Input = styled(InputBase)`
  && {
    flex: 1 auto;
    color: inherit;
  }
`;
