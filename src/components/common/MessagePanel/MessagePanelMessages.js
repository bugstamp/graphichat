import React, { Component, Fragment, createRef } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import { position } from 'polished';
import { map, includes, isEqual } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 15;
`;

const MessagePanelListScrollable = styled(List)`
  && {
    margin-top: auto;
    z-index: 10;
  }
`;

const MessagePanelListItem = styled(ListItem)`
  && {
    padding-top: ${getSpacing(1)};
    padding-bottom: ${getSpacing(1)};
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
  width: 3px;
  display: ${({ presence }) => (presence ? 'block' : 'none')};
  background-color: ${getStyledProps('theme.palette.grey.300')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: .25s ease;
  z-index: 20;
  cursor: pointer;

  div {
    position: relative;
    background-color: ${getStyledProps('theme.palette.primary.main')};
    will-change: transform;
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
  padding: ${getSpacing(1)};
  ${({ isMyMessage }) => ({
    [`border-bottom-${isMyMessage ? 'left' : 'right'}-radius`]: 0,
  })};
  background-color: ${({ isMyMessage }) => (isMyMessage ? grey[100] : blue[100])};
  border-radius: 5px;
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
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ appeared }) => (appeared ? 'visibility' : 'hidden')}
`;

class MessagePanelMessages extends Component {
  listScrollableRef = createRef();

  listViewRef = createRef();

  scrollbarThumbRef = createRef();

  state = {
    scrollbar: false,
    scrollbarPresence: false,
    listHeight: 0,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { listHeight } = this.state;

    if (!isEqual(listHeight, nextState.listHeight)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      chatId,
      loading,
      adding,
      messages,
    } = this.props;
    if (!isEqual(prevProps.chatId, chatId)) {
      this.scrollToBottom();
    }

    if (
      isEqual(prevProps.chatId, chatId)
      &&
      !isEqual(prevProps.messages, messages)
    ) {
      if (!adding) {
        this.updateScrollPosition();
      } else {
        this.scrollToBottom();
      }
    }
  }

  onScroll = () => {
    this.calculateScrollbarPosition();
  }

  toggleScrollbar = (scrollbar) => {
    const { scrollbarPresence } = this.state;

    if (!scrollbarPresence) {
      return;
    }
    this.setState({ scrollbar });
  }

  calculateScrollbarPosition = () => {
    const { scrollTop } = this.listViewRef.current;
    const { height: listHeight } = this.listScrollableRef.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listViewRef.current.getBoundingClientRect();
    const scrollHeight = listHeight - listViewHeight;
    const ratioPercent = scrollTop / scrollHeight;
    const thumbHeight = Math.max(20, (listViewHeight / listHeight) * listViewHeight);
    const scrollbarHeight = listViewHeight - thumbHeight;
    const thumbPosition = ratioPercent * scrollbarHeight;

    this.scrollbarThumbRef.current.style.height = `${thumbHeight}px`;
    this.scrollbarThumbRef.current.style.transform = `translate(0, ${thumbPosition}px)`;
  }

  onResize = (width, height) => {
    const listViewRect = this.listViewRef.current.getBoundingClientRect();
    const { height: listViewHeight } = listViewRect;

    this.setState({ listHeight: height });

    if (height > listViewHeight) {
      this.setScrollbarPresence(true);
      this.calculateScrollbarPosition();
    } else {
      this.setScrollbarPresence(false);
    }
  }

  onIntersectionChange = (inView, { target: { id } }) => {
    const {
      fetchHorizon,
      messages,
      loading,
      getMessages,
    } = this.props;
    const validFetchHorizon = fetchHorizon - 1;
    const observableItem = messages[validFetchHorizon];

    if (observableItem) {
      const { id: observableId } = observableItem;

      if (inView && (observableId === id) && !loading) {
        getMessages();
      }
    }
  }

  setScrollbarPresence = (scrollbarPresence) => {
    this.setState({ scrollbarPresence });
  }

  scrollToBottom = () => {
    const { height: listHeight } = this.listScrollableRef.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listViewRef.current.getBoundingClientRect();

    if (listHeight > listViewHeight) {
      this.listViewRef.current.scrollTop = this.listViewRef.current.scrollHeight;
    }
  }

  updateScrollPosition = () => {
    const { listHeight } = this.state;
    const { scrollTop } = this.listViewRef.current;
    const { height } = this.listScrollableRef.current.getBoundingClientRect();
    const diff = height - listHeight;

    if (scrollTop < diff) {
      this.listViewRef.current.scrollTop = diff + scrollTop;
    }
  }

  onMouseDown = (e) => {
    e.preventDefault();

    const { clientY: initialClientY } = e;
    const listViewRect = this.listViewRef.current.getBoundingClientRect();
    const scrollThumbRect = this.scrollbarThumbRef.current.getBoundingClientRect();
    const thumbOffset = scrollThumbRect.bottom - listViewRect.top;
    const mouseOffset = initialClientY - listViewRect.top;
    const diff = thumbOffset - mouseOffset;

    const onMouseMove = ({ clientY }) => {
      const listRect = this.listScrollableRef.current.getBoundingClientRect();
      const { height: scrollThumbRectHeight } = this.scrollbarThumbRef.current.getBoundingClientRect();
      const currentMouseOffset = clientY - listViewRect.top;
      const positionInView = listViewRect.height - (currentMouseOffset + diff);
      const ratioPercent = positionInView / (listViewRect.height - scrollThumbRectHeight);
      const scrollHeight = listRect.height - listViewRect.height;
      const scrollTop = scrollHeight - (ratioPercent * scrollHeight);
      let validScrollTop = scrollTop;

      if (scrollTop < 0) validScrollTop = 0;
      if (scrollTop > scrollHeight) validScrollTop = scrollHeight;

      this.listViewRef.current.scrollTop = validScrollTop;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  render() {
    const { scrollbar, scrollbarPresence } = this.state;
    const {
      messages,
      myId,
      loading,
      sendedIds,
    } = this.props;

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
              <MessagePanelListItem ref={ref} id={id}>
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
            )}
          </InView>
        );
      });
    };

    return (
      <Wrapper
        onMouseEnter={() => this.toggleScrollbar(true)}
        onMouseLeave={() => this.toggleScrollbar(false)}
      >
        <ListScrollbar show={scrollbar} presence={scrollbarPresence}>
          <div
            ref={this.scrollbarThumbRef}
            onDragStart={() => false}
            onMouseDown={this.onMouseDown}
          />
        </ListScrollbar>
        <MessagePanelListView ref={this.listViewRef} onScroll={this.onScroll}>
          <MessagePanelListScrollable ref={this.listScrollableRef} disablePadding>
            <ReactResizeDetector onResize={this.onResize} handleHeight>
              <Fragment>
                <MessagePanelLoading appeared={loading}>
                  <CircularProgress size={20} color="primary" />
                </MessagePanelLoading>
                {renderMessages()}
              </Fragment>
            </ReactResizeDetector>
          </MessagePanelListScrollable>
        </MessagePanelListView>
      </Wrapper>
    );
  }
}

export default MessagePanelMessages;
