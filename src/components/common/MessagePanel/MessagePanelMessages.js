import React, { Component } from 'react';
import styled from 'styled-components';
import { position } from 'polished';
import { map, findIndex } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import { getStyledProps, getSpacing } from '../../../styles';
import {
  messageTimeParser,
  messageHistoryDateParser,
  isSameDay,
} from '../../../helpers';

const Wrapper = styled.div`
  flex: 1 auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const MessagePanelList = styled(List)`
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

const MessagePanelListItem = styled(({ me, ...rest }) => (<ListItem {...rest} />))`
  && {
    flex-flow: column;
    align-items: ${({ me }) => (me ? 'flex-start' : 'flex-end')};
  }
`;

const MessagePanelListItemMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: ${({ alignItems }) => alignItems};
`;

const MessagePanelHistoryDivider = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${getSpacing(1)} 0;

  p {
    height: 1px;
    flex: 1 auto;
    display: inline-flex;
    background-color: ${grey[500]};
    border-radius: 2px;
  }

  span {
    padding: 0 ${getSpacing(2)};
    color: ${grey[500]};
  }
`;

const MessagePanelMessage = styled.div`
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

const MessagePanelSystemMessage = styled.div`
  padding: ${getSpacing(1)};
  color: ${grey[500]};
  background-color: ${grey[100]};
  border-radius: 10px;
`;

const MessagePanelMessageTime = styled.div`
  display: flex;
  justify-content: flex-start;

  span {
    ${getStyledProps('theme.typography.caption')};
    color: ${getStyledProps('theme.palette.text.secondary')};
  }
`;

class MessagePanelMessages extends Component {
  render() {
    const { messages, myId } = this.props;

    const renderMessages = () => {
      let prevMessageTime;

      return map(messages, ({
        id,
        type,
        time,
        content,
      }) => {
        const isSystem = type === 'system';
        const isFirst = findIndex(messages, { id }) === 0;
        const direction = id === myId ? 'start' : 'end';
        const alignItems = isSystem ? 'center' : `flex-${direction}`;
        let divider = false;

        if (prevMessageTime) {
          divider = !isSameDay(time, prevMessageTime);
        }
        prevMessageTime = time;

        return (
          <MessagePanelListItem key={id}>
            <MessagePanelListItemMessageWrapper alignItems={alignItems}>
              <If condition={isFirst || divider}>
                <MessagePanelHistoryDivider>
                  <p />
                  <span>{messageHistoryDateParser(time)}</span>
                  <p />
                </MessagePanelHistoryDivider>
              </If>
              <Choose>
                <When condition={isSystem}>
                  <MessagePanelSystemMessage>
                    {content}
                  </MessagePanelSystemMessage>
                </When>
                <Otherwise>
                  <MessagePanelMessage>
                    {content}
                  </MessagePanelMessage>
                  <MessagePanelMessageTime>
                    <span>{messageTimeParser(time, 'wide')}</span>
                  </MessagePanelMessageTime>
                </Otherwise>
              </Choose>
            </MessagePanelListItemMessageWrapper>
          </MessagePanelListItem>
        );
      });
    };

    return (
      <Wrapper>
        <MessagePanelList disablePadding>
          {renderMessages()}
        </MessagePanelList>
      </Wrapper>
    );
  }
}

export default MessagePanelMessages;
