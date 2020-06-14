import React from 'react';
import styled from 'styled-components';
// import { size } from 'polished';

import Tab from '@material-ui/core/Tab';

import { getStyledProps, getSpacing } from '../../styles';

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavigationStyled = styled.aside`
  --nav-size: 60px;
  display: flex;
  background-color: ${getStyledProps('theme.palette.primary.main')};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const mdDown = breakpoints.down('md');

    return `
      ${mdDown} {
        --nav-size: 52px;
      }
    `;
  }}

  ${(props) => {
    const { variant } = props;

    if (variant === 'vertical') {
      return `
        width: var(--nav-size);
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
      height: var(--nav-size);

      ${LogoWrapper} {
        margin: 0 ${getSpacing(2)(props)};
      }
    `;
  }}
`;

export const TabItem = styled(({
  attrs,
  ...rest
}) => (<Tab {...rest} />)).attrs(({ attrs = {} }) => (attrs))`
  && {
    min-width: inherit;
    border-radius: 50%;
    opacity: 1;
  }
`;

export const TabItemIndicator = styled.span`
  display: block;
  position: absolute;
  background-color: ${getStyledProps('theme.palette.primary.contrastText')};
  transition: .25s ease;
`;

export const TabsWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  position: relative;

  ${(props) => {
    const { variant, activeTab } = props;

    if (variant === 'vertical') {
      return `
        flex-flow: column;
        margin: ${getSpacing(1)(props)} 0;

        button:first-of-type {
          margin-top: auto;
        }

        ${TabItem} {
          height: var(--nav-size);
        }

        ${TabItemIndicator} {
          width: 2px;
          height: var(--nav-size);
          top: calc(${activeTab} * var(--nav-size));
          left: 0;
        }
      `;
    }
    return `
      flex-flow: row nowrap;

      button:first-of-type {
        margin-left: auto;
      }

      ${TabItem} {
        width: var(--nav-size);
      }

      ${TabItemIndicator} {
        width: var(--nav-size);
        height: 2px;
        bottom: 0;
        left: calc(${activeTab} * var(--nav-size));
      }
    `;
  }};
`;
