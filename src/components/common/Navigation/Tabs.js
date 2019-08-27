import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { map } from 'lodash';

import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import tabs from './navTabs';
import { getStyledProps } from '../../../styles';

const TabsStyled = styled.div`
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

const TabItem = styled(({ variant, itemSize, ...rest }) => (<Tab {...rest} />))`
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

const TabItemIndicator = styled.span`
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

const Tabs = ({
  variant,
  itemSize,
  activeTab,
  setActiveTab,
  toggleSettingsDialog,
  signOut,
}) => {
  const defineOnClick = (tabName, tabIndex) => {
    switch (tabName) {
      case 'chats': {
        return () => setActiveTab(tabIndex);
      }
      case 'settings': {
        return toggleSettingsDialog;
      }
      case 'logout': {
        return signOut;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <TabsStyled variant={variant}>
      {map(tabs, (
        {
          name,
          Icon,
          to,
          htmlColor,
        },
        index,
      ) => {
        const isLink = !!to;
        const activeColor = (activeTab === index) ? 'primary' : 'action';
        const color = !htmlColor ? activeColor : 'inherit';
        const component = isLink ? Link : Button;
        const onClick = defineOnClick(name, index);

        return (
          <TabItem
            key={name}
            to={to}
            component={component}
            icon={<Icon color={color} htmlColor={htmlColor} />}
            onClick={onClick}
            itemSize={itemSize}
            variant={variant}
          />
        );
      })}
      <TabItemIndicator
        variant={variant}
        itemSize={itemSize}
        activeTab={activeTab}
      />
    </TabsStyled>
  );
};

Tabs.defaultProps = {
  itemSize: 60,
};
Tabs.propTypes = {
  variant: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  itemSize: PropTypes.number,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Tabs;
