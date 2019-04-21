import React, { PureComponent } from 'react';
import styled from 'styled-components';
// import {} from 'polished';
// import {} from 'lodash';

import Tabs from './Tabs';
import Logo from '../Logo';

import { getSpacing } from '../../../styles';

const Wrapper = styled.div`
  width: 60px;
  padding-top: ${getSpacing(2)};
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
    const { signOut } = this.props;

    return (
      <Wrapper>
        <Logo />
        <Tabs
          activeTab={activeTab}
          onChangeTab={this.handleChangeTab}
          signOut={signOut}
        />
      </Wrapper>
    );
  }
}

export default Navigation;
