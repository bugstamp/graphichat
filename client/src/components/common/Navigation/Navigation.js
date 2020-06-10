import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import Logo from '../Logo';

import { NavigationStyled, LogoWrapper } from './styled';

const Navigation = ({
  logoSize,
  variant,
  toggleSettingsDialog,
  signOut,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <NavigationStyled position="static" variant={variant}>
      <LogoWrapper>
        <Logo size={logoSize} />
      </LogoWrapper>
      <Tabs
        variant={variant}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSettingsDialog={toggleSettingsDialog}
        signOut={signOut}
      />
    </NavigationStyled>
  );
};

Navigation.defaultProps = {
  logoSize: 32,
  variant: 'vertical',
};
Navigation.propTypes = {
  variant: PropTypes.oneOf(['vertical', 'horizontal']),
  logoSize: PropTypes.number,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default memo(Navigation);
