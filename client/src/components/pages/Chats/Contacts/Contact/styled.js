import React from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import MaterialListItem from '@material-ui/core/ListItem';

import { getStyledProps, getSpacing } from '../../../../../styles';

export const ListItem = styled(({ isSelected, ...rest }) => <MaterialListItem {...rest} />)`
  && {
    padding-right: 60px;
    padding-left: ${getSpacing(1)};
    margin-bottom: ${getSpacing(1)};
    background-color: ${({ isSelected, ...rest }) => (isSelected
    ? getStyledProps('theme.palette.action.hover')(rest)
    : '#fff')};
    border-radius: ${getStyledProps('theme.shape.borderRadius')}px;
    transition: ${getStyledProps('theme.transitions.easing.easeIn')};
    box-shadow: ${getStyledProps('theme.shadows.1')};

    &&:hover {
      background-color: ${getStyledProps('theme.palette.action.hover')};
      cursor: pointer;
    }
  }
`;

export const SecondaryInfo = styled.div`
  width: 60px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-between;
  ${position('absolute', 0, 0, 0, null)};
  color: ${getStyledProps('theme.palette.grey.700')};
  padding: 11px;
  padding-left: 0;
`;

export const Time = styled.span`
  width: 100%;
  font-size: 11px;
  text-align: right;
`;

// const Badge = styled.div`
//   min-width: 21px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 5px;
//   font-size: 11px;
//   color: #fff;
//   background-color: ${red[500]};
//   border-radius: 50%;
// `;
