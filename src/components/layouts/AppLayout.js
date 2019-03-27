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
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';

import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleRounded';
import PersonIcon from '@material-ui/icons/PersonRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import GroupIcon from '@material-ui/icons/GroupRounded';
import BookmarkIcon from '@material-ui/icons/BookmarkRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import LogoutIcon from '@material-ui/icons/ExitToAppRounded';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

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
    display: flex;
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

const AppListWrapper = styled.div`
  flex: 1 auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const AppList = styled(List)`
  && {
    ${position('absolute', 0, '-17px', 0, 0)}
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
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

const AppListItemAvatar = styled.div`
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

const AppListItemSecondary = styled.div`
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

const AppListFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AppMessagePanel = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #fff;
    padding: ${getSpacing(2)} ${getSpacing(3)};
  }
`;

const AppMessagePanelTopBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${getStyledProps('theme.palette.grey.300')};
`;

const AppMessagePanelTopBarName = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  p {
    ${getStyledProps('theme.typography.subtitle2')};
  }
`;

const AppMessagePanelTopBarNameStatus = styled.span`
  ${getStyledProps('theme.typography.caption')};
  color: ${({ online, ...rest }) => (online
    ? green[600]
    : getStyledProps('theme.palette.grey.500')(rest))};
`;

const AppMessagePanelComment = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.300')};
  padding-top: ${getSpacing(1)};
`;

const AppMessagePanelCommentAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${getSpacing(2)};
`;

const AppMessagePanelCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
`;

const AppMessagePanelCommentInput = styled(Input)`
  && {
    width: 100%;
    min-height: 80px;
    display: inline-flex;
    align-items: flex-start;

    > div {
      width: 95%;
    }
  }
`;

const AppMessagePanelCommentSmiles = styled.div`
  ${position('absolute', 0, 0, null, null)}
  font-size: 28px;
  color: ${grey[500]};
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: ${orange[300]};
  }
`;

const AppMessagePanelCommentSubmit = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-top: ${getSpacing(1)};
    text-transform: uppercase;

    svg {
      margin-left: ${getSpacing(1)};
    }
  }
`;

const AppMessagePanelListWrapper = styled.div`
  flex: 1 auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const AppMessagePanelList = styled(List)`
  && {
    ${position('absolute', 0, '-17px', 0, 0)}
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    overflow-y: scroll;
  }
`;

const AppMessagePanelListItem = styled(ListItem)`
  && {
    justify-content: ${({ me }) => (me ? 'flex-start' : 'flex-end')};
  }
`;

const AppMessagePanelListMessage = styled.div`
  border-radius: 10px;
  background-color: ${blue[100]};
  padding: ${getSpacing(2)};
  ${'' /* ${({ me }) => me ? { 'border-bottom-left-radius': 0 } : { 'border-bottom-right-radius': 0 } }; */}

  &:hover {
    cursor: pointer;
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
                  return (<TabStyled key={name} {...tabProps} />);
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
                    <AppListWrapper>
                      <AppList disablePadding>
                        <AppListItem>
                          <AppListItemAvatar>
                            <Avatar>KG</Avatar>
                            <span />
                          </AppListItemAvatar>
                          <AppListItemText primary="Kiril Grischenko" secondary="You: Hello, bro!" />
                          <AppListItemSecondary>
                            <span>12:17 pm</span>
                            <div>10</div>
                          </AppListItemSecondary>
                        </AppListItem>
                      </AppList>
                    </AppListWrapper>
                    <AppListFooter>
                      <Fab color="secondary">
                        <AddIcon />
                      </Fab>
                    </AppListFooter>
                  </AppListPanel>
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={8} lg={6}>
                    <AppMessagePanel square elevation={0}>
                      <AppMessagePanelTopBar>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                        <AppMessagePanelTopBarName>
                          <p>Kiril Grischenko</p>
                          <AppMessagePanelTopBarNameStatus online>
                            online
                          </AppMessagePanelTopBarNameStatus>
                        </AppMessagePanelTopBarName>
                        <IconButton>
                          <SettingsIcon />
                        </IconButton>
                      </AppMessagePanelTopBar>
                      <AppMessagePanelListWrapper>
                        <AppMessagePanelList>
                          <AppMessagePanelListItem>
                            <AppMessagePanelListMessage>
                              Hi, Kiril!
                            </AppMessagePanelListMessage>
                          </AppMessagePanelListItem>
                          <AppMessagePanelListItem me>
                            <AppMessagePanelListMessage me>
                              Hi!
                            </AppMessagePanelListMessage>
                          </AppMessagePanelListItem>
                        </AppMessagePanelList>
                      </AppMessagePanelListWrapper>
                      <AppMessagePanelComment>
                        <AppMessagePanelCommentAvatar>
                          <Avatar>KG</Avatar>
                        </AppMessagePanelCommentAvatar>
                        <AppMessagePanelCommentForm>
                          <AppMessagePanelCommentSmiles>
                            <MoodIcon fontSize="inherit" color="inherit" />
                          </AppMessagePanelCommentSmiles>
                          <AppMessagePanelCommentInput placeholder="Write a message..." multiline />
                          <AppMessagePanelCommentSubmit>
                            <Button color="primary">
                              Send
                              <SendIcon />
                            </Button>
                          </AppMessagePanelCommentSubmit>
                        </AppMessagePanelCommentForm>
                        <AppMessagePanelCommentAvatar>
                          <Avatar>KG</Avatar>
                        </AppMessagePanelCommentAvatar>
                      </AppMessagePanelComment>
                    </AppMessagePanel>
                  </Grid>
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
