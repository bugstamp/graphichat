import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { map, set } from 'lodash';
import styled from 'styled-components';
import { size, position, ellipsis } from 'polished';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Hidden from '@material-ui/core/Hidden';

import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import GroupIcon from '@material-ui/icons/GroupRounded';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

import { getStyledProps, getSpacing } from '../../styles';

const AppContainer = styled(Paper)`
  ${size('100%')};
  display: flex;
  flex-flow: row nowrap;
`;

const AppNavigation = styled.div`
  flex: 0 60px;
  padding-top: ${getSpacing(2)};
`;

const AppContent = styled(Paper)`
  && {
    flex: 1 auto;
    display: flex;
    align-items: stretch;
  }
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

const AppListPanel = styled(Paper)`
  && {
    height: 100%;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.grey.100')};
    padding: ${getSpacing(2)};
    padding-top: ${getSpacing(3)};
  }
`;

const AppListSearch = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  margin-bottom: ${getSpacing(1)};
  color: ${getStyledProps('theme.palette.grey.600')};
  background-color: #fff;
  border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')}
`;

const SearchIconWrapper = styled.div`
  flex: 0 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledProps('theme.palette.primary.light')};
`;

const SearchInput = styled(InputBase)`
  && {
    flex: 1 auto;
    color: inherit;
  }
`;

const AppList = styled(List)`
  && {
    flex: 1 auto;
    transition-duration: ${getStyledProps('theme.transitions.duration.shortest', 'ms')};
    transition-timing-function: ${getStyledProps('theme.transitions.easing.sharp')};
  }
`;

const AppListItem = styled(ListItem)`
  && {
    padding-right: 60px;

    &&:hover {
      background-color: #fff;
      border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')};
      cursor: pointer;
    }
  }
`;

const AppListItemText = styled(ListItemText)`
  && {
    display: inline-flex;
    flex-flow: column;

    * {
      ${ellipsis('100%')};
    }
  }
`;

const AppListAvatarWrapper = styled.div`
  position: relative;
  border-radius: 50%;

  span {
    ${position('absolute', null, '2px', '2px', null)};
    ${size('10px')};
    display: block;
    background-color: ${green[500]};
    border-radius: 50%;
  }
`;

const AppListSecondaryItems = styled.div`
  width: 60px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-between;
  ${position('absolute', 0, 0, 0, null)};
  color: ${getStyledProps('theme.palette.grey.700')};
  padding: 11px;
  padding-left: 0;

  span {
    width: 100%;
    font-size: 11px;
    text-align: right;
    text-transform: uppercase;
  }

  div {
    min-width: 20px;
    min-height: 20px;
    max-width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: ${red[500]};
    border-radius: 50%;
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

  handleChangeTab = (index) => {
    this.setState({ activeTab: index });
  }

  render() {
    const { activeTab } = this.state;
    // const { children } = this.props;

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} lg={10}>
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
                <TabStyled icon={<LogoutIcon nativeColor={red[900]} />} />
                <TabIndicatorCustomStyled activeTab={activeTab} />
              </TabsCustomStyled>
            </AppNavigation>
            <AppContent square elevation={0}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} lg={3}>
                  <AppListPanel square elevation={0}>
                    <AppListSearch>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <SearchInput type="text" placeholder="Search..." />
                    </AppListSearch>
                    <AppList>
                      <AppListItem>
                        <AppListAvatarWrapper>
                          <Avatar>KG</Avatar>
                          <span />
                        </AppListAvatarWrapper>
                        <AppListItemText primary="onemorekiril" secondary="You: Hello, bro!" />
                        <AppListSecondaryItems>
                          <span>12:17 pm</span>
                          <div>10</div>
                        </AppListSecondaryItems>
                      </AppListItem>
                    </AppList>
                  </AppListPanel>
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>Messages</Grid>
                </Hidden>
                <Hidden mdDown>
                  <Grid item lg={3}>Details</Grid>
                </Hidden>
              </Grid>
            </AppContent>
          </AppContainer>
        </Grid>
      </Grid>
    );
  }
}

AppLayout.propTypes = {};

export default hot(module)(AppLayout);
