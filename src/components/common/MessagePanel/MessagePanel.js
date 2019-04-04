import React, { Component } from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';

import SearchIcon from '@material-ui/icons/SearchRounded';
import SettingsIcon from '@material-ui/icons/SettingsRounded';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

import { getStyledProps, getSpacing } from '../../../styles';

const AppMessagePanel = styled(Paper)`
  && {
    height: 100%;
    max-width: 700px;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} ${getSpacing(2)};
    margin: 0 auto;
    background-color: #fff;
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

const AppMessagePanelListItem = styled(({ me, ...rest }) => (<ListItem {...rest} />))`
  && {
    flex-flow: column;
    align-items: ${({ me }) => (me ? 'flex-start' : 'flex-end')};
  }
`;

const AppMessagePanelListMessage = styled.div`
  border-radius: 10px;
  background-color: ${({ me }) => (me ? grey[100] : blue[100])};
  padding: ${getSpacing(2)};
  ${({ me }) => ({
    [`border-bottom-${me ? 'left' : 'right'}-radius`]: 0,
  })};

  &:hover {
    cursor: pointer;
  }
`;

const AppMessagePanelListMessageTime = styled.div`
  display: flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
`;

class MessagePanel extends Component {
  render() {
    return (
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
          <AppMessagePanelList disablePadding>
            <AppMessagePanelListItem>
              <AppMessagePanelListMessage>
                Hi, Kiril!
              </AppMessagePanelListMessage>
              <AppMessagePanelListMessageTime>
                <span>13:00:15</span>
              </AppMessagePanelListMessageTime>
            </AppMessagePanelListItem>
            <AppMessagePanelListItem me>
              <AppMessagePanelListMessage me>
                Hi!
              </AppMessagePanelListMessage>
              <AppMessagePanelListMessageTime>
                <span>13:01:30</span>
              </AppMessagePanelListMessageTime>
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
              <Button variant="text" color="primary">
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
    );
  }
}

export default MessagePanel;
