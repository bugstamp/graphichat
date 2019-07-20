import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import RootRef from '@material-ui/core/RootRef';

import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';

import AppListItemAvatar from '../../../common/ContactPanel/AppList/ListItemAvatar';
import TopLineProgress from '../../../common/TopLineProgress';

import { getStyledProps, getSpacing } from '../../../../styles';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.300')};
  padding-top: ${getSpacing(1)};
`;

const MessagePanelCommentAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${getSpacing(2)};
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
  submitButtonRef = createRef();

  inputRef = createRef();

  state = {
    value: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { submit } = this.props;

    if (value) {
      submit(value);
      this.clear();
    }
  }

  onChange = () => {
    const { value } = this.inputRef.current;

    this.setState({ value });
  }

  clear = () => {
    this.setState({ value: '' });
    this.inputRef.current.focus();
  }

  onKeyDown = ({ key }) => {
    if (key === 'Escape') {
      this.inputRef.current.blur();
    } else if (key === 'Enter') {
      this.submitButtonRef.current.click();
    }
  }

  render() {
    const { value } = this.state;
    const { adding, avatars: { me, contact } } = this.props;

    return (
      <Wrapper>
        <TopLineProgress height="1px" loading={adding} bordered />
        <MessagePanelCommentAvatar>
          <AppListItemAvatar {...me} />
        </MessagePanelCommentAvatar>
        <MessagePanelCommentForm onSubmit={this.onSubmit}>
          <MessagePanelCommentSmiles>
            <MoodIcon fontSize="inherit" color="inherit" />
          </MessagePanelCommentSmiles>
          <MessagePanelCommentInput
            inputRef={this.inputRef}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Write a message..."
            multiline
          />
          <MessagePanelCommentSubmit>
            <RootRef rootRef={this.submitButtonRef}>
              <Button
                variant="text"
                color="primary"
                type="submit"
              >
                {'Send'}
                <SendIcon />
              </Button>
            </RootRef>
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
