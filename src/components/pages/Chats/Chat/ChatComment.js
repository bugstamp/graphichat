import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import {} from 'polished';
import { trim, isEqual } from 'lodash';

import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/SendRounded';

// import MoodIcon from '@material-ui/icons/MoodRounded';
// import grey from '@material-ui/core/colors/grey';
// import orange from '@material-ui/core/colors/orange';

import ListItemAvatar from '../../../common/List/ListItemAvatar';

import { getStyledProps, getSpacing } from '../../../../styles';
import { userAvatarProps } from '../../../propTypes';

const Wrapper = styled.div`
  min-height: 60px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-top: 1px solid ${getStyledProps('theme.palette.grey.300')};
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
  padding: ${getSpacing(1)};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        flex-flow: row nowrap;
        align-items: center;
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

// const Emoji = styled.div`
//   ${position('absolute', 0, 0, null, null)}
//   font-size: 28px;
//   color: ${grey[500]};
//   cursor: pointer;
//   z-index: 10;
//
//   &:hover {
//     color: ${orange[300]};
//   }
// `;

const Submit = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    text-transform: uppercase;
  }

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const mdUp = breakpoints.up('md');
    const mdDown = breakpoints.down('md');

    return `
      ${mdUp} {
        width: 100%;
        margin-top: ${spacing(1)}px;

        svg {
          margin-left: ${spacing(1)}px;
        }
      }
      ${mdDown} {
        button {
          margin-left: ${spacing(1)}px;
        }
      }
    `;
  }}
`;

class ChatComment extends Component {
  submitButtonRef = createRef();

  inputRef = createRef();

  shouldComponentUpdate(nextProps) {
    const { avatars } = this.props;

    if (
      !isEqual(avatars.me.src, nextProps.avatars.me.src)
      ||
      !isEqual(avatars.contact.src, nextProps.avatars.contact.src)
    ) {
      return true;
    }
    return false;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.inputRef.current;
    const { submit } = this.props;
    const trimmedValue = trim(value);

    if (trimmedValue) {
      submit(trimmedValue);
    }
    this.clearValue();
  }

  clearValue = () => {
    this.inputRef.current.value = '';
    this.inputRef.current.focus();
  }

  onKeyDown = (e) => {
    const { key, ctrlKey } = e;

    if (key === 'Escape') {
      this.inputRef.current.blur();
    } else if (key === 'Enter' && ctrlKey) {
      this.submitButtonRef.current.click();
    }
  }

  render() {
    const {
      avatars: {
        me,
        contact,
      },
    } = this.props;

    return (
      <Wrapper>
        <Hidden smDown implementation="css">
          <UserAvatar>
            <ListItemAvatar {...me} />
          </UserAvatar>
        </Hidden>
        <Form onSubmit={this.onSubmit}>
          <FormInput
            inputRef={this.inputRef}
            onKeyDown={this.onKeyDown}
            placeholder="Write a message..."
            multiline
          />
          <Submit>
            <Hidden smDown implementation="css">
              <Button
                ref={this.submitButtonRef}
                variant="text"
                color="primary"
                type="submit"
              >
                Send
                <SendIcon />
              </Button>
            </Hidden>
            <Hidden mdUp implementation="css">
              <IconButton
                ref={this.submitButtonRef}
                size="small"
                color="primary"
                type="submit"
              >
                <SendIcon />
              </IconButton>
            </Hidden>
          </Submit>
        </Form>
        <Hidden smDown implementation="css">
          <UserAvatar>
            <ListItemAvatar {...contact} />
          </UserAvatar>
        </Hidden>
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
