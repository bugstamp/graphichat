import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'polished';

import Tabs from './Tabs';
import Logo from '../Logo';

const NavigationStyled = styled.div`
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

const LogoWrapper = styled.div`
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

const Navigation = ({
  itemSize,
  logoSize,
  variant,
  toggleSettingsDialog,
  signOut,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <NavigationStyled variant={variant}>
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
    </NavigationStyled>
  );
};

Navigation.defaultProps = {
  itemSize: 60,
  logoSize: 35,
  variant: 'vertical',
};
Navigation.propTypes = {
  itemSize: PropTypes.number,
  logoSize: PropTypes.number,
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default Navigation;
