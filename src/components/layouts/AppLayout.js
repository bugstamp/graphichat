import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map, set } from 'lodash';
import styled from 'styled-components';
import { size } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import GroupIcon from '@material-ui/icons/GroupRounded';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

import { getStyledProps, getPadding } from '../../styles';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
  flex-flow: row nowrap;
`;

const AppNavigation = styled.div`
  flex: 0 60px;
  padding-top: ${getPadding(2)};
`;

const AppContent = styled.div`
  flex: 1 auto;
`;

const TabStyled = styled(Tab)`
  && {
    min-width: inherit;
    height: 60px;
    border-radius: 50%;
  }
`;

const TabIndicatorCustomStyled = styled.span`
  width: 2px;
  height: 60px;
  display: block;
  position: absolute;
  top: ${({ activeTab }) => `${activeTab * 60}px`};
  right: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  transition: .25s ease;
`;

const TabsCustomStyled = styled.div`
  min-width: 100%;
  height: auto;
  display: flex;
  flex-flow: column;
  position: relative;

  a:last-of-type {
    margin-bottom: 100%;
  }
`;

const Logo = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 35px;
  margin-bottom: 100%;
`;

const LogoIcon = styled(({ above, ...rest }) => <ChatBubbleIcon {...rest} />)`
  && {
    color: ${({ above }) => (above ? blue[500] : indigo[500])};
    opacity: ${({ above }) => (above ? 1 : 0.5)};

    ${({ above }) => above && `
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-40%);
    `}
  }
`;

const links = [
  {
    name: 'person',
    Icon: PersonIcon,
    to: 'person',
  },
  {
    name: 'group',
    Icon: GroupIcon,
    to: 'group',
  },
  {
    name: 'saved',
    Icon: BookmarkIcon,
    to: 'saved',
  },
];

class AppLayout extends Component {
  state = {
    activeTab: 0,
  }

  componentDidMount

  handleChangeTab = (index) => {
    this.setState({ activeTab: index });
  }

  render() {
    const { activeTab } = this.state;
    const { children } = this.props;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item md={12} lg={8}>
          <AppContainer square>
            <AppNavigation>
              <Logo>
                <LogoIcon fontSize="inherit" above />
                <LogoIcon fontSize="inherit" />
              </Logo>
              <TabsCustomStyled>
                {map(links, ({ name, Icon, to }, index) => {
                  const color = activeTab === index ? 'primary' : 'action';
                  const tabProps = {
                    onClick: () => this.handleChangeTab(index),
                    icon: <Icon color={color} />,
                  };

                  if (to) {
                    set(tabProps, 'to', to);
                    set(tabProps, 'component', Link);
                  }

                  return (
                    <TabStyled key={name} {...tabProps} />
                  );
                })}
                <TabStyled icon={<SettingsIcon color="action" />} />
                <TabStyled icon={<LogoutIcon nativeColor={red[900]} fontSize="large" />} />
                <TabIndicatorCustomStyled activeTab={activeTab} />
              </TabsCustomStyled>
            </AppNavigation>
            <AppContent>
              <Grid container justify="center" spacing={0}>
                <Grid item>{children}</Grid>
                <Grid item></Grid>
                <Grid item></Grid>
              </Grid>
            </AppContent>
          </AppContainer>
        </Grid>
      </Grid>
    );
  }
}

AppLayout.propTypes = {};

export default AppLayout;
