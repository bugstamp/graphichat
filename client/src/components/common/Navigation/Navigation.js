import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import Logo from '../Logo';

import { NavigationStyled, LogoWrapper } from './styled';

const Navigation = ({
  itemSize,
  logoSize,
  variant,
  toggleSettingsDialog,
  signOut,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <NavigationStyled position="static" variant={variant} itemSize={itemSize}>
      <LogoWrapper>
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
    </NavigationStyled>
  );
};

Navigation.defaultProps = {
  itemSize: 56,
  logoSize: 40,
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
