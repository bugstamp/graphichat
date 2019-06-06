import React, { Component, Fragment, createRef } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components';
import { position } from 'polished';
import {
  reverse, map, findIndex, includes,
} from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import RootRef from '@material-ui/core/RootRef';

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
  position: relative;
  overflow: hidden;
`;

const MessagePanelListView = styled.div`
  ${position('absolute', 0, '-17px', 0, 0)};
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const MessagePanelList = styled(({ scrollbarPresence, ...rest }) => <List {...rest} />)`
  && {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
  }
`;

const MessagePanelListItem = styled(ListItem)`
  && {
    flex-flow: column;
  }
`;

const MessagePanelListItemMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: ${({ alignItems }) => alignItems};
`;

const ListScrollbar = styled.div`
  ${position('absolute', 0, 0, 0, null)};
  width: 2px;
  background-color: ${getStyledProps('theme.palette.grey.300')};

  div {
    ${position('absolute', null, 0, 0, 0)};
    background-color: ${getStyledProps('theme.palette.primary.main')};
  }
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
  max-width: 49%;
  padding: ${getSpacing(2)};
  ${({ isMyMessage }) => ({
    [`border-bottom-${isMyMessage ? 'left' : 'right'}-radius`]: 0,
  })};
  background-color: ${({ isMyMessage }) => (isMyMessage ? grey[100] : blue[100])};
  border-radius: 10px;
  opacity: ${({ isAdding }) => (isAdding ? 0.3 : 1)};
  word-break: break-all;
  ${getStyledProps('theme.typography.body2')};

  &:hover {
    cursor: text;
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

const MessagePanelLoading = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(1)} 0;
`;

class MessagePanelMessages extends Component {
  listRef = createRef();

  listViewRef = createRef();

  scrollbarRef = createRef();

  scrollbarThumbRef = createRef();

  state = {
    scrollbarPresence: false,
    scrollbarThumbHeight: 50,
  }

  componentDidMount() {
    this.listViewRef.current.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.listViewRef.current.removeEventListener('scroll', this.onScroll);
  }

  onScroll = ({ target: { scrollTop } }) => {
    const { getMessages, loading } = this.props;

    if (scrollTop === 0 && !loading) {
      getMessages();
    }
    this.calculateScrollbarPosition();
  }

  calculateScrollbarPosition = () => {
    const { scrollbarThumbHeight } = this.state;
    const listViewRect = this.listViewRef.current.getBoundingClientRect();
    const listRect = this.listRef.current.getBoundingClientRect();
    const { scrollTop } = this.listViewRef.current;
    const { height: listHeight } = listRect;
    const { height: listViewHeight } = listViewRect;
    const scrollHeight = listHeight - listViewHeight;
    const ratioPercent = scrollTop / scrollHeight;
    const scrollbarHeight = (listViewHeight - scrollbarThumbHeight);
    const thumbPosition = scrollbarHeight - (ratioPercent * scrollbarHeight);

    this.scrollbarThumbRef.current.style.bottom = `${thumbPosition}px`;
  }

  onResize = (width, height) => {
    const listViewRect = this.listViewRef.current.getBoundingClientRect();
    const { height: listViewHeight } = listViewRect;

    if (height > listViewHeight) {
      this.setState({ scrollbarPresence: true });
      this.calculateScrollbarPosition();
    } else {
      this.setState({ scrollbarPresence: false });
    }
  }

  render() {
    const { scrollbarPresence, scrollbarThumbHeight } = this.state;
    const { messages, myId, loading, sendedIds } = this.props;

    const renderMessages = () => {
      let prevMessageTime;

      return map(messages, ({
        id,
        senderId,
        type,
        time,
        content,
      }) => {
        const isSystem = type === 'system';
        const isFirst = findIndex(messages, { id }) === 0;
        const isMyMessage = senderId === myId;
        const isAdding = includes(sendedIds, id);
        const direction = isMyMessage ? 'start' : 'end';
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
                    <p>{content}</p>
                  </MessagePanelSystemMessage>
                </When>
                <Otherwise>
                  <MessagePanelMessage
                    isMyMessage={isMyMessage}
                    isAdding={isAdding}
                  >
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
        <If condition={scrollbarPresence}>
          <RootRef rootRef={this.scrollbarRef}>
            <ListScrollbar>
              <RootRef rootRef={this.scrollbarThumbRef}>
                <div style={{ height: `${scrollbarThumbHeight}px` }} />
              </RootRef>
            </ListScrollbar>
          </RootRef>
        </If>
        <RootRef rootRef={this.listViewRef}>
          <MessagePanelListView>
            <RootRef rootRef={this.listRef}>
              <MessagePanelList disablePadding scrollbarPresence={scrollbarPresence}>
                <ReactResizeDetector handleHeight onResize={this.onResize}>
                  <Fragment>
                    <If condition={loading}>
                      <MessagePanelLoading>
                        <CircularProgress color="primary" />
                      </MessagePanelLoading>
                    </If>
                    {renderMessages()}
                  </Fragment>
                </ReactResizeDetector>
              </MessagePanelList>
            </RootRef>
          </MessagePanelListView>
        </RootRef>
      </Wrapper>
    );
  }
}

export default MessagePanelMessages;
