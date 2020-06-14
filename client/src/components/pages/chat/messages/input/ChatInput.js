import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { trim, isEqual } from 'lodash';

import Hidden from '@material-ui/core/Hidden';
import SendIcon from '@material-ui/icons/SendRounded';
// import MoodIcon from '@material-ui/icons/MoodRounded';

import ListItemAvatar from '../../../../common/List/ListItemAvatar';

import {
  ChatInputStyled,
  Form,
  FormInput,
  SubmitButton,
  FabSubmitButton,
} from './styled';
import { userAvatarProps } from '../../../../propTypes';

class ChatInput extends PureComponent {
  submitButtonRef = createRef();

  inputRef = createRef();

  state = {
    value: '',
  }

  componentDidUpdate(prevProps) {
    const { chatId } = this.props;

    if (!isEqual(prevProps.chatId, chatId)) {
      this.clearValue();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { submit } = this.props;
    const trimmedValue = trim(value);

    if (trimmedValue) {
      submit(trimmedValue);
    }
    this.clearValue();
  }

  clearValue = () => {
    this.setState({ value: '' });
  }

  onSubmitClick = (e) => {
    this.onSubmit(e);
    this.inputRef.current.focus();
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  onKeyDown = (e) => {
    const { key, ctrlKey } = e;

    if (key === 'Escape') {
      this.inputRef.current.blur();
    } else if (key === 'Enter' && ctrlKey) {
      this.onSubmit(e);
    }
  }

  render() {
    const { value } = this.state;
    const {
      myAvatar,
      contactAvatar,
    } = this.props;

    return (
      <ChatInputStyled>
        <Hidden smDown implementation="css">
          <ListItemAvatar {...myAvatar} />
        </Hidden>
        <Form onSubmit={this.onSubmit}>
          <FormInput
            inputRef={this.inputRef}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Write a message..."
            autoFocus
            multiline
          />
          <Hidden smDown implementation="css">
            <FabSubmitButton
              ref={this.submitButtonRef}
              onClick={this.onSubmit}
              size="medium"
              color="primary"
              type="submit"
            >
              <SendIcon />
            </FabSubmitButton>
          </Hidden>
          <Hidden mdUp implementation="css">
            <SubmitButton
              ref={this.submitButtonRef}
              onClick={this.onSubmit}
              size="small"
              color="primary"
              type="submit"
            >
              <SendIcon />
            </SubmitButton>
          </Hidden>
        </Form>
        <Hidden smDown implementation="css">
          <ListItemAvatar {...contactAvatar} />
        </Hidden>
      </ChatInputStyled>
    );
  }
}

ChatInput.defaultProps = {
  chatId: null,
};
ChatInput.propTypes = {
  chatId: PropTypes.string,
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
  submit: PropTypes.func.isRequired,
};

export default ChatInput;
