import React, {
  memo,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { trim } from 'lodash';

import Hidden from '@material-ui/core/Hidden';
import SendIcon from '@material-ui/icons/SendRounded';
// import MoodIcon from '@material-ui/icons/MoodRounded';

import ListItemAvatar from '../../../../common/List/ListItemAvatar';

import {
  ChatBottomBarStyled,
  Form,
  FormInput,
  SubmitButton,
  FabSubmitButton,
} from './styled';
import { userAvatarProps } from '../../../../propTypes';

const ChatBottomBar = (props) => {
  const {
    chatId,
    myAvatar,
    contactAvatar,
    submit,
  } = props;
  const inputRef = useRef(null);

  const clearValue = () => {
    inputRef.current.value = '';
  };

  useEffect(() => {
    clearValue();
  }, [chatId]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = inputRef.current;
    const trimmedValue = trim(value);

    if (trimmedValue) {
      submit(trimmedValue);
    }
    clearValue();
  };

  const onKeyDown = (e) => {
    const { key, ctrlKey } = e;

    if (key === 'Escape') {
      inputRef.current.blur();
    } else if (key === 'Enter' && ctrlKey) {
      onSubmit(e);
    }
  };

  return (
    <ChatBottomBarStyled>
      <Hidden smDown>
        <ListItemAvatar {...myAvatar} />
      </Hidden>
      <Form onSubmit={onSubmit}>
        <FormInput
          inputRef={inputRef}
          onKeyDown={onKeyDown}
          placeholder="Write a message..."
          autoFocus
          multiline
        />
        <Hidden smDown>
          <FabSubmitButton
            size="medium"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </FabSubmitButton>
        </Hidden>
        <Hidden mdUp>
          <SubmitButton
            size="small"
            color="primary"
            type="submit"
          >
            <SendIcon />
          </SubmitButton>
        </Hidden>
      </Form>
      <Hidden smDown>
        <ListItemAvatar {...contactAvatar} />
      </Hidden>
    </ChatBottomBarStyled>
  );
};

ChatBottomBar.defaultProps = {
  chatId: null,
};
ChatBottomBar.propTypes = {
  chatId: PropTypes.string,
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
  submit: PropTypes.func.isRequired,
};

export default memo(ChatBottomBar);
