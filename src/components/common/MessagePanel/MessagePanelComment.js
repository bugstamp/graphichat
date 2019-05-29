import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import LinearProgress from '@material-ui/core/LinearProgress';

import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';

import AppListItemAvatar from '../ContactPanel/AppList/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../styles';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 2px solid ${getStyledProps('theme.palette.grey.300')};
  padding-top: ${getSpacing(1)};
`;

const MessagePanelSubmitProgress = styled.div`
  ${position('absolute', -2, 0, null, 0)}
  height: 2px;
`;

const LinearProgressStyled = styled(LinearProgress)`
  && {
    height: 2px;
  }
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

class MessagePanelComment extends Component {
  inputRef = createRef()

  onSubmit = (e) => {
    e.preventDefault();
    const { submit } = this.props;
    const { value } = this.inputRef.current;

    if (value) {
      submit(value);
      this.inputRef.current.value = '';
    }
  }

  render() {
    const { adding, avatars: { me, contact } } = this.props;

    return (
      <Wrapper>
        <MessagePanelSubmitProgress>
          <If condition={adding}>
            <LinearProgressStyled color="primary" />
          </If>
        </MessagePanelSubmitProgress>
        <MessagePanelCommentAvatar>
          <AppListItemAvatar {...me} />
        </MessagePanelCommentAvatar>
        <MessagePanelCommentForm onSubmit={this.onSubmit}>
          <MessagePanelCommentSmiles>
            <MoodIcon fontSize="inherit" color="inherit" />
          </MessagePanelCommentSmiles>
          <MessagePanelCommentInput inputRef={this.inputRef} placeholder="Write a message..." multiline />
          <MessagePanelCommentSubmit>
            <Button variant="text" color="primary" type="submit">
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
  }
}

export default MessagePanelComment;
