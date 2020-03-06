import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import Logo from '../Logo';

import { NavigationWrapper, LogoWrapper } from './styled';

const Navigation = ({
  itemSize,
  logoSize,
  variant,
  toggleSettingsDialog,
  signOut,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <NavigationWrapper variant={variant}>
      <LogoWrapper variant={variant} itemSize={itemSize}>
        <Logo size={logoSize} />
      </LogoWrapper>
      <Tabs
        variant={variant}
        itemSize={itemSize}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSettingsDialog={toggleSettingsDialog}
        signOut={signOut}
      />
    </NavigationWrapper>
  );
};

Navigation.defaultProps = {
  itemSize: 60,
  logoSize: 35,
  variant: 'vertical',
};
Navigation.propTypes = {
  variant: PropTypes.oneOf(['vertical', 'horizontal']),
  itemSize: PropTypes.number,
  logoSize: PropTypes.number,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default memo(Navigation);
