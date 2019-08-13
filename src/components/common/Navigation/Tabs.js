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
  flex-flow: column;
  position: relative;

  button:first-of-type {
    margin-top: auto;
  }
`;

const TabItem = styled(Tab)`
  && {
    min-width: inherit;
    height: ${getStyledProps('height')}px;
    border-radius: 50%;
  }
`;

const TabItemIndicator = styled.span`
  width: 2px;
  height: ${getStyledProps('itemSize')}px;
  display: block;
  position: absolute;
  top: ${({ activeTab, itemSize }) => `${activeTab * itemSize}px`};
  right: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  transition: .25s ease;
`;

const Tabs = ({
  itemSize,
  activeTab,
  onChangeTab,
  toggleSettingsDialog,
  signOut,
}) => {
  const defineOnClick = (tabName, tabIndex) => {
    switch (tabName) {
      case 'chats': {
        return () => onChangeTab(tabIndex);
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
    <TabsStyled>
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
            height={itemSize}
          />
        );
      })}
      <TabItemIndicator itemSize={itemSize} activeTab={activeTab} />
    </TabsStyled>
  );
};

Tabs.defaultProps = {
  itemSize: 60,
};
Tabs.propTypes = {
  itemSize: PropTypes.number,
  activeTab: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Tabs;
