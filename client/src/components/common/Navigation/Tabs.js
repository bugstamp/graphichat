import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import Button from '@material-ui/core/Button';

import { TabsWrapper, TabItem, TabItemIndicator } from './styled';
import tabs from './navTabs';

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
    <TabsWrapper variant={variant} role="tablist">
      {map(tabs, (
        {
          name,
          Icon,
          to,
          htmlColor,
          attrs,
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
            icon={(<Icon color={color} htmlColor={htmlColor} />)}
            onClick={onClick}
            itemSize={itemSize}
            variant={variant}
            attrs={attrs}
          />
        );
      })}
      <TabItemIndicator
        variant={variant}
        itemSize={itemSize}
        activeTab={activeTab}
      />
    </TabsWrapper>
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
