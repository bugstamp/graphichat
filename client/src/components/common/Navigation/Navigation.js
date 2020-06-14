import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import Logo from '../Logo';

import { NavigationStyled, LogoWrapper } from './styled';

const Navigation = (props) => {
  const { logoSize, variant, signOut } = props;
  const [settingsDialog, toggleSettingsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleToggleSettingsDialog = useCallback(() => {
    toggleSettingsDialog(!settingsDialog);
  }, [settingsDialog]);

  return (
    <NavigationStyled position="static" variant={variant}>
      <LogoWrapper>
        <Logo size={logoSize} />
      </LogoWrapper>
      <Tabs
        variant={variant}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSettingsDialog={handleToggleSettingsDialog}
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
  signOut: PropTypes.func.isRequired,
};

export default memo(Navigation);
