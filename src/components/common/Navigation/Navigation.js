import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'polished';
// import {} from 'lodash';

import Tabs from './Tabs';
import Logo from '../Logo';

// import { getSpacing } from '../../../styles';

const Wrapper = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const LogoWrapper = styled.div`
  ${size('60px')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

class Navigation extends PureComponent {
  state = {
    activeTab: 0,
  }

  handleChangeTab = (index) => {
    this.setState({ activeTab: index });
  }

  render() {
    const { activeTab } = this.state;
    const { toggleSettingsDialog, signOut } = this.props;

    return (
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Tabs
          activeTab={activeTab}
          onChangeTab={this.handleChangeTab}
          toggleSettingsDialog={toggleSettingsDialog}
          signOut={signOut}
        />
      </Wrapper>
    );
  }
}

Navigation.propTypes = {
  toggleSettingsDialog: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
