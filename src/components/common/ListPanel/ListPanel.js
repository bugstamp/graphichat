import React, { Component } from 'react';
import styled from 'styled-components';
import { size, position, ellipsis } from 'polished';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';

import AddIcon from '@material-ui/icons/AddRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import { getStyledProps, getSpacing } from '../../../styles';

const WrapperPaper = styled(Paper)`
  && {
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.background.default')};
    padding: ${getSpacing(2)};
    padding-top: ${getSpacing(3)};
  }
`;

const ListPanelSearch = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  margin-bottom: ${getSpacing(1)};
  color: ${getStyledProps('theme.palette.grey.600')};
  background-color: #fff;
  border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')}
`;

const ListPanelSearchIcon = styled.div`
  flex: 0 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledProps('theme.palette.primary.light')};
`;

const ListPanelSearchInput = styled(InputBase)`
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

    > * {
      ${ellipsis('100%')};
    }
  }
`;

const AppListItemAvatarIndicator = styled.span`
  ${position('absolute', null, '2px', '2px', null)};
  ${size('10px')};
  display: block;
  background-color: ${green[500]};
  border-radius: 50%;
`;

const AppListItemAvatar = styled.div`
  position: relative;
  border-radius: 50%;
`;

const AppListItemTime = styled.span`
  width: 100%;
  font-size: 11px;
  text-align: right;
  text-transform: uppercase;
`;

const AppListItemBadge = styled.div`
  min-width: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 11px;
  color: #fff;
  background-color: ${red[500]};
  border-radius: 50%;
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
`;

const AppListFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${getSpacing(1)} 0;
`;

class ListPanel extends Component {
  render() {
    return (
      <WrapperPaper square elevation={0}>
        <ListPanelSearch>
          <ListPanelSearchIcon>
            <SearchIcon />
          </ListPanelSearchIcon>
          <ListPanelSearchInput type="text" placeholder="Search..." />
        </ListPanelSearch>
        <AppListWrapper>
          <AppList disablePadding>
            <AppListItem>
              <AppListItemAvatar>
                <Avatar>KG</Avatar>
                <AppListItemAvatarIndicator />
              </AppListItemAvatar>
              <AppListItemText primary="Kiril Grischenko" secondary="You: Hello, bro!" />
              <AppListItemSecondary>
                <AppListItemTime>12:17 pm</AppListItemTime>
                <AppListItemBadge>10</AppListItemBadge>
              </AppListItemSecondary>
            </AppListItem>
          </AppList>
        </AppListWrapper>
        <AppListFooter>
          <Fab color="secondary" size="medium">
            <AddIcon />
          </Fab>
        </AppListFooter>
      </WrapperPaper>
    );
  }
}

export default ListPanel;
