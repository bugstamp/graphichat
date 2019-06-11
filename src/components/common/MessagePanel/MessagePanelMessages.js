import React, { Component, Fragment, createRef } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import { position } from 'polished';
import {
  map, findIndex, includes, isEqual,
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
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const MessagePanelList = styled(({ scrollbarPresence, ...rest }) => <List {...rest} />)`
  && {
    margin-top: auto;
    display: flex;
    flex-flow: column;
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
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: .25s ease;

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

  scrollbarThumbRef = createRef();

  state = {
    scrollbar: false,
    scrollbarPresence: false,
    scrollbarThumbHeight: 50,
    observableId: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { observableId } = this.state;

    if (!isEqual(observableId, nextState.observableId)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;

    if (!isEqual(prevProps.messages, messages) && messages.length) {
      const { id } = messages[0];
      console.log(messages);

      if (this.state.observableId) {
        this.scrollToMessage(this.state.observableId)
      } else {
        this.scrollToBottom();
      }
      this.setObservableId(id);
    }
  }

  onScroll = () => {
    this.calculateScrollbarPosition();
  }

  toggleScrollbar = () => {
    this.setState(({ scrollbar }) => ({ scrollbar: !scrollbar }));
  }

  calculateScrollbarPosition = () => {
    const { scrollbarThumbHeight } = this.state;
    const { scrollTop } = this.listViewRef.current;
    const { height: listHeight } = this.listRef.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listViewRef.current.getBoundingClientRect();
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
      this.setScrollbarPresence(true);
      this.calculateScrollbarPosition();
    } else {
      this.setScrollbarPresence(false);
    }
  }

  onIntersectionChange = (inView, { target: { id }}) => {
    const { observableId } = this.state;
    const { getMessages, loading } = this.props;

    if (inView && (observableId === id) && !loading) {
      getMessages();
    }
  }

  setObservableId = (observableId = null) => {
    this.setState({ observableId });
  }

  setScrollbarPresence = (scrollbarPresence) => {
    this.setState({ scrollbarPresence });
  }

  scrollToBottom = () => {
    const { height: listHeight } = this.listRef.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listViewRef.current.getBoundingClientRect();

    if (listHeight > listViewHeight) {
      this.listViewRef.current.scrollTop = this.listViewRef.current.scrollHeight;
    }
  }

  scrollToMessage = (messageId) => {
    const el = document.getElementById(messageId);
    console.log(this.listViewRef.current.scrollTop);
    console.log(el.offsetTop);
    console.log(el.getBoundingClientRect().height + 3);
    console.log(this.listRef.current.getBoundingClientRect());

    this.listViewRef.current.scrollTop = el.offsetTop;
  }

  render() {
    const { scrollbar, scrollbarPresence, scrollbarThumbHeight } = this.state;
    const { messages, myId, loading, sendedIds } = this.props;

    const renderMessages = () => {
      return map(messages, ({
        id,
        senderId,
        type,
        time,
        content,
      }, index) => {
        const isSystem = type === 'system';
        const isFirst = messages[0].id === id;
        const isMyMessage = senderId === myId;
        const isAdding = includes(sendedIds, id);
        const direction = isMyMessage ? 'start' : 'end';
        const alignItems = isSystem ? 'center' : `flex-${direction}`;
        let divider = false;

        if (index > 0) {
          const { time: prevMessageTime } = messages[index - 1];

          divider = !isSameDay(time, prevMessageTime);
        }

        return (
          <InView key={id} onChange={this.onIntersectionChange}>
            {({ ref }) => (
              <RootRef rootRef={ref}>
                <MessagePanelListItem id={id}>
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
              </RootRef>
            )}
          </InView>
        );
      });
    };

    return (
      <Wrapper>
        <If condition={scrollbarPresence}>
          <ListScrollbar show={scrollbar}>
            <RootRef rootRef={this.scrollbarThumbRef}>
              <div style={{ height: `${scrollbarThumbHeight}px` }} />
            </RootRef>
          </ListScrollbar>
        </If>
        <RootRef rootRef={this.listViewRef}>
          <MessagePanelListView
            onScroll={this.onScroll}
            onMouseEnter={this.toggleScrollbar}
            onMouseLeave={this.toggleScrollbar}
          >
            <RootRef rootRef={this.listRef}>
              <MessagePanelList disablePadding scrollbarPresence={scrollbarPresence}>
                <Fragment>
                  <If condition={loading}>
                    <MessagePanelLoading>
                      <CircularProgress color="primary" />
                    </MessagePanelLoading>
                  </If>
                </Fragment>
                <ReactResizeDetector handleHeight onResize={this.onResize}>
                  {renderMessages()}
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
