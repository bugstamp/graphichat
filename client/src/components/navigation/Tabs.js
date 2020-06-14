import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import Button from '@material-ui/core/Button';

import { TabsWrapper, TabItem, TabItemIndicator } from './styled';
import tabs from './navTabs';

const Tabs = ({
  variant,
  activeTab,
  setActiveTab,
  toggleSettingsDialog,
  signOut,
}) => {
  const handleOnClick = useCallback((tabName, tabIndex) => {
    switch (tabName) {
      case 'settings': {
        return toggleSettingsDialog;
      }
      case 'logout': {
        return () => signOut();
      }
      default: {
        return () => setActiveTab(tabIndex);
      }
    }
  }, [toggleSettingsDialog, setActiveTab, signOut]);

  return (
    <TabsWrapper variant={variant} activeTab={activeTab} role="tablist">
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
        const onClick = handleOnClick(name, index);

        return (
          <TabItem
            key={name}
            to={to}
            component={component}
            icon={(<Icon color={color} htmlColor={htmlColor} />)}
            onClick={onClick}
            attrs={attrs}
          />
        );
      })}
      <TabItemIndicator />
    </TabsWrapper>
  );
};

Tabs.propTypes = {
  variant: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Tabs;
