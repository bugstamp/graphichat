import React from 'react';
import styled from 'styled-components';
// import { size } from 'polished';

import Tab from '@material-ui/core/Tab';

import { getStyledProps, getSpacing } from '../../../styles';

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavigationStyled = styled.aside`
  display: flex;
  background-color: ${getStyledProps('theme.palette.primary.main')};

  ${(props) => {
    const { itemSize, variant } = props;

    if (variant === 'vertical') {
      return `
        width: ${itemSize}px;
        height: 100%;
        flex-flow: column;

        ${LogoWrapper} {
          margin-top: ${getSpacing(2)(props)};
          margin-bottom: ${getSpacing(4)(props)};
        }
      `;
    }
    return `
      width: 100%;
      height: ${itemSize}px;

      ${LogoWrapper} {
        margin: 0 ${getSpacing(2)(props)};
      }
    `;
  }}
`;

export const TabsWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  position: relative;

  ${(props) => {
    const { variant } = props;

    if (variant === 'vertical') {
      return `
        flex-flow: column;
        margin: ${getSpacing(1)(props)} 0;

        button:first-of-type {
          margin-top: auto;
        }
      `;
    }
    return `
      flex-flow: row nowrap;

      button:first-of-type {
        margin-left: auto;
      }
    `;
  }};
`;

export const TabItem = styled(({
  variant,
  itemSize,
  attrs,
  ...rest
}) => (<Tab {...rest} />)).attrs(({ attrs = {} }) => (attrs))`
  && {
    min-width: inherit;
    border-radius: 50%;
    opacity: 1;

  ${({ variant, itemSize }) => {
    if (variant === 'vertical') {
      return `
        height: ${itemSize}px;
      `;
    }
    return `
      width: ${itemSize}px;
    `;
  }};
  }
`;

export const TabItemIndicator = styled.span`
  display: block;
  position: absolute;
  background-color: ${getStyledProps('theme.palette.primary.contrastText')};
  transition: .25s ease;

  ${({ variant, itemSize, activeTab }) => {
    const offset = `${activeTab * itemSize}px`;

    if (variant === 'vertical') {
      return `
        width: 2px;
        height: ${itemSize}px;
        top: ${offset};
        left: 0;
      `;
    }
    return `
      width: ${itemSize}px;
      height: 2px;
      bottom: 0;
      left: ${offset};
    `;
  }};
`;
