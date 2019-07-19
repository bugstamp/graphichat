import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
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

const ListWrapper = styled.div`
  flex: 1 auto;
  position: relative;
  overflow: hidden;
`;

const ListView = styled.div`
  ${position('absolute', 0, '-17px', 0, 0)};
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 15;
`;

const ListScrollable = styled.div`
  margin-top: auto;
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
`;

const ListScrollbarThumb = styled.button`
  width: 100%;
  position: relative;
  padding: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  border: none;
  will-change: transform;
  cursor: pointer;
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

const ListFetchMore = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ appeared }) => (appeared ? 'visibility' : 'hidden')}
`;

class AppList extends Component {
  constructor(props) {
    super(props);

    this.listScrollable = createRef();
    this.listView = createRef();
    this.scrollbarThumb = createRef();

    this.state = {
      scrollbar: false,
      scrollbarPresence: false,
      scrollbarDragging: false,
      listHeight: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { listHeight, scrollbarDragging } = this.state;

    if (
      !isEqual(listHeight, nextState.listHeight)
      ||
      !isEqual(scrollbarDragging, nextState.scrollbarDragging)
    ) {
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
        this.updateScrollTopAfterFetchMore();
      } else {
        this.scrollToBottom();
      }
    }
  }

  toggleScrollbar = (scrollbar) => {
    const { scrollbarDragging, scrollbarPresence } = this.state;

    if (scrollbarPresence && !scrollbarDragging) {
      this.setState({ scrollbar });
    }
  }

  toggleScrollbarDragging = () => {
    this.setState(({ scrollbarDragging }) => ({ scrollbarDragging: !scrollbarDragging }));
  }

  calculateScrollbarPosition = () => {
    const { scrollTop } = this.listView.current;
    const { height: listHeight } = this.listScrollable.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();
    const listScrollHeight = listHeight - listViewHeight;
    const ratioPercent = scrollTop / listScrollHeight;
    const thumbHeight = Math.max(20, (listViewHeight / listHeight) * listViewHeight);
    const scrollbarHeight = listViewHeight - thumbHeight;
    const thumbPosition = ratioPercent * scrollbarHeight;

    this.scrollbarThumb.current.style.height = `${thumbHeight}px`;
    this.scrollbarThumb.current.style.transform = `translate(0, ${thumbPosition}px)`;
  }

  onMouseDown = (e) => {
    e.preventDefault();

    const { clientY: initialClientY } = e;
    const {
      top: viewPrevTopOffsett,
      height: viewPrevHeight,
    } = this.listView.current.getBoundingClientRect();
    const {
      bottom: thumbPrevBottomOffset,
    } = this.scrollbarThumb.current.getBoundingClientRect();
    const thumbOffset = thumbPrevBottomOffset - viewPrevTopOffsett;
    const mouseOffset = initialClientY - viewPrevTopOffsett;
    const diff = thumbOffset - mouseOffset;

    this.toggleScrollbarDragging();

    const onMouseMove = ({ clientY }) => {
      const {
        height: listHeight,
      } = this.listScrollable.current.getBoundingClientRect();
      const {
        height: thumbHeight,
      } = this.scrollbarThumb.current.getBoundingClientRect();
      const currentMouseOffset = clientY - viewPrevTopOffsett;
      const positionInView = viewPrevHeight - (currentMouseOffset + diff);
      const ratioPercent = positionInView / (viewPrevHeight - thumbHeight);
      const scrollHeight = listHeight - viewPrevHeight;
      const scrollTop = scrollHeight - (ratioPercent * scrollHeight);
      let nextScrollTop = scrollTop;

      if (scrollTop < 0) nextScrollTop = 0;
      if (scrollTop > scrollHeight) nextScrollTop = scrollHeight;

      this.listView.current.scrollTop = nextScrollTop;
    };

    const onMouseUp = () => {
      this.toggleScrollbarDragging();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onScroll = () => {
    this.calculateScrollbarPosition();
  }

  onResize = (width, height) => {
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();

    this.setState({ listHeight: height });

    if (height > listViewHeight) {
      this.setScrollbarPresence(true);
      this.calculateScrollbarPosition();
    } else {
      this.setScrollbarPresence(false);
    }
  }

  onIntersectionChange = (inView, { target }) => {
    const {
      fetchTreshold,
      messages,
      getMessages,
    } = this.props;
    const rowIndex = Number(target.getAttribute('row-index'));
    const index = messages.length - rowIndex;
    const tresholdIndex = fetchTreshold;

    if (inView && (index === tresholdIndex)) {
      getMessages();
    }
  }

  setScrollbarPresence = (scrollbarPresence) => {
    this.setState({ scrollbarPresence });
  }

  scrollToBottom = () => {
    const { height: listHeight } = this.listScrollable.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();

    if (listHeight > listViewHeight) {
      this.updateScrollTop(this.listView.current.scrollHeight);
    }
  }

  updateScrollTop = (scrollTop) => {
    this.listView.current.scrollTop = scrollTop;
  }

  updateScrollTopAfterFetchMore = () => {
    const { listHeight } = this.state;
    const { scrollTop } = this.listView.current;
    const { height } = this.listScrollable.current.getBoundingClientRect();
    const diff = height - listHeight;

    if (scrollTop < diff) {
      this.updateScrollTop(diff + scrollTop);
    }
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
        const rowIndex = messages.length - index;
        const key = `row-${rowIndex}`;
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
          <InView
            key={key}
            onChange={this.onIntersectionChange}
            triggerOnce
          >
            {({ ref }) => (
              <MessagePanelListItem ref={ref} row-index={rowIndex}>
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
      <ListWrapper
        onMouseEnter={() => this.toggleScrollbar(true)}
        onMouseLeave={() => this.toggleScrollbar(false)}
        onWheel={() => !scrollbar && this.toggleScrollbar(true)}
      >
        <ListScrollbar show={scrollbar} presence={scrollbarPresence}>
          <ListScrollbarThumb
            ref={this.scrollbarThumb}
            type="button"
            onDragStart={() => false}
            onMouseDown={this.onMouseDown}
          />
        </ListScrollbar>
        <ListView ref={this.listView} onScroll={this.onScroll}>
          <ListScrollable ref={this.listScrollable}>
            <ReactResizeDetector onResize={this.onResize} handleHeight>
              <Fragment>
                <ListFetchMore appeared={loading}>
                  <CircularProgress size={20} color="primary" />
                </ListFetchMore>
                <List disablePadding>
                  {renderMessages()}
                </List>
              </Fragment>
            </ReactResizeDetector>
          </ListScrollable>
        </ListView>
      </ListWrapper>
    );
  }
}

AppList.defaultProps = {
  type: 'list',
  startFrom: 'top',
};
AppList.propTypes = {
  type: PropTypes.oneOf(['list', 'fetchMore']),
  startFrom: PropTypes.oneOf(['top', 'bottom']),
};

export default AppList;
