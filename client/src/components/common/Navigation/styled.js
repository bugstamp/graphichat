import React from 'react';
import styled from 'styled-components';
import { size } from 'polished';

import Tab from '@material-ui/core/Tab';

import { getStyledProps } from '../../../styles';

export const NavigationWrapper = styled.div`
  display: flex;
  background-color: #fff;

  ${({ itemSize, variant }) => {
    if (variant === 'vertical') {
      return `
        width: ${itemSize}px;
        height: 100%;
        flex-flow: column;
      `;
    }
    return `
      width: 100%;
      height: ${itemSize}px;
    `;
  }}
`;

export const LogoWrapper = styled.div`
  ${({ itemSize }) => size(`${itemSize}px`)};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ itemSize, variant }) => {
    if (variant === 'vertical') {
      return `
        margin-bottom: ${itemSize}px;
      `;
    }
    return '';
  }}
`;

export const TabsWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  position: relative;
  ${({ variant }) => {
    if (variant === 'vertical') {
      return `
        flex-flow: column;

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
  background-color: ${getStyledProps('theme.palette.primary.main')};
  transition: .25s ease;

  ${({ variant, itemSize, activeTab }) => {
    const offset = `${activeTab * itemSize}px`;

    if (variant === 'vertical') {
      return `
        width: 2px;
        height: ${itemSize}px;
        top: ${offset};
        right: 0;
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
