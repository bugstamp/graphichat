import React from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';

import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';

import AppListItemAvatar from '../ContactPanel/AppList/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.300')};
  padding-top: ${getSpacing(1)};
`;

const MessagePanelCommentAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${getSpacing(1)};
`;

const MessagePanelCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
`;

const MessagePanelCommentInput = styled(Input)`
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

const MessagePanelCommentSmiles = styled.div`
  ${position('absolute', 0, 0, null, null)}
  font-size: 28px;
  color: ${grey[500]};
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: ${orange[300]};
  }
`;

const MessagePanelCommentSubmit = styled.div`
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

const MessagePanelComment = ({ avatars: { me, contact } }) => {
  return (
    <Wrapper>
      <MessagePanelCommentAvatar>
        <AppListItemAvatar {...me} />
      </MessagePanelCommentAvatar>
      <MessagePanelCommentForm>
        <MessagePanelCommentSmiles>
          <MoodIcon fontSize="inherit" color="inherit" />
        </MessagePanelCommentSmiles>
        <MessagePanelCommentInput placeholder="Write a message..." multiline />
        <MessagePanelCommentSubmit>
          <Button variant="text" color="primary">
            Send
            <SendIcon />
          </Button>
        </MessagePanelCommentSubmit>
      </MessagePanelCommentForm>
      <MessagePanelCommentAvatar>
        <AppListItemAvatar {...contact} />
      </MessagePanelCommentAvatar>
    </Wrapper>
  );
};

export default MessagePanelComment;
