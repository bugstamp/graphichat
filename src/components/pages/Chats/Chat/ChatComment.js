import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MoodIcon from '@material-ui/icons/MoodRounded';
import SendIcon from '@material-ui/icons/SendRounded';

import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';

import ListItemAvatar from '../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../styles';
import { userAvatarProps } from '../../../propTypes';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.300')};
  padding-top: ${getSpacing(1)};
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${getSpacing(2)};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
`;

const FormInput = styled(Input)`
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

const Emoji = styled.div`
  ${position('absolute', 0, 0, null, null)}
  font-size: 28px;
  color: ${grey[500]};
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: ${orange[300]};
  }
`;

const Submit = styled.div`
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

class ChatComment extends Component {
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
      this.clearValue();
    }
  }

  onChange = () => {
    const { value } = this.inputRef.current;
    this.setState({ value });
  }

  clearValue = () => {
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
    const {
      avatars: {
        me,
        contact,
      },
    } = this.props;

    return (
      <Wrapper>
        <UserAvatar>
          <ListItemAvatar {...me} />
        </UserAvatar>
        <Form onSubmit={this.onSubmit}>
          <Emoji>
            <MoodIcon fontSize="inherit" color="inherit" />
          </Emoji>
          <FormInput
            inputRef={this.inputRef}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Write a message..."
            multiline
          />
          <Submit>
            <Button
              ref={this.submitButtonRef}
              variant="text"
              color="primary"
              type="submit"
            >
              {'Send'}
              <SendIcon />
            </Button>
          </Submit>
        </Form>
        <UserAvatar>
          <ListItemAvatar {...contact} />
        </UserAvatar>
      </Wrapper>
    );
  }
}

ChatComment.propTypes = {
  avatars: PropTypes.shape({
    me: PropTypes.shape(userAvatarProps).isRequired,
    contact: PropTypes.shape(userAvatarProps).isRequired,
  }).isRequired,
  submit: PropTypes.func.isRequired,
};

export default ChatComment;
