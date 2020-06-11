import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { trim, isEqual } from 'lodash';

import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/SendRounded';
// import MoodIcon from '@material-ui/icons/MoodRounded';

import ListItemAvatar, { ListItemAvatarStyled } from '../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../styles';
import { userAvatarProps } from '../../../propTypes';

const Wrapper = styled.div`
  min-height: 52px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.200')};
  background-color: #fff;

  ${ListItemAvatarStyled} {
    padding: ${getSpacing(1)};
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;
  padding: ${getSpacing(1)};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        flex-flow: row nowrap;
        align-items: center;
        padding: ${getSpacing(0.5)(props)};
      }
    `;
  }}
`;

const FormInput = styled(Input)`
  && {
    width: 100%;
    display: inline-flex;
    align-items: flex-start;

    > div {
      width: 95%;
    }

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const mdUp = breakpoints.up('md');
    const smDown = breakpoints.down('sm');

    return `
      ${mdUp} {
        min-height: 80px;
      }
      ${smDown} {
        padding: ${spacing(1)}px;
        border: 1px solid ${getStyledProps('theme.palette.grey.400')(props)};
        border-radius: 20px;

        &:before,
        &:after {
          display: none;
        }
      }
    `;
  }}
  }
`;

const SubmitButton = styled(IconButton)`
  && {
    padding: ${getSpacing(1)};
  }
`;

const FabSubmitButton = styled(Fab)`
  && {
    position: absolute;
    top: -24px;
    right: 0;
    z-index: 30;
  }
`;

class ChatMessageInput extends PureComponent {
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
      <Wrapper>
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
      </Wrapper>
    );
  }
}

ChatMessageInput.defaultProps = {
  chatId: null,
};
ChatMessageInput.propTypes = {
  chatId: PropTypes.string,
  myAvatar: PropTypes.shape(userAvatarProps).isRequired,
  contactAvatar: PropTypes.shape(userAvatarProps).isRequired,
  submit: PropTypes.func.isRequired,
};

export default ChatMessageInput;
