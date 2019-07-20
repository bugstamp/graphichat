import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import styled from 'styled-components';
import { position } from 'polished';
import { isEqual, isFunciton } from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';

import ListItems from './ListItems';

import { getStyledProps } from '../../../styles';

const ListWrapper = styled.div`
  flex: 1 auto;
  position: relative;
  overflow: hidden;
`;

const ListView = styled.div`
  ${position('absolute', 0, '-17px', 0, 0)};
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 15;
`;

const ListScrollable = styled.div`
  margin-top: auto;
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

const ListFetchMore = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ appeared }) => (appeared ? 'visibility' : 'hidden')}
`;

const ListLoading = styled.div`
  ${position('absolute', '50%', 0, 0, '50%')};
  transform: translate(-50%, -50%);
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.scrollbarThumb = createRef();
    this.listView = createRef();
    this.listScrollable = createRef();

    this.state = {
      scrollbar: false,
      scrollbarPresence: false,
      scrollbarDragging: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { scrollbarDragging } = this.state;

    if (!isEqual(scrollbarDragging, nextState.scrollbarDragging)) {
      return false;
    }
    return true;
  }

  toggleScrollbarDragging = () => {
    this.setState(({ scrollbarDragging }) => ({ scrollbarDragging: !scrollbarDragging }));
  }

  getListHeight = () => this.listScrollable.current.getBoundingClientRect().height || 0;

  getListViewHeight = () => this.listView.current.getBoundingClientRect().height || 0;

  setScrollbar = (scrollbar) => {
    const { scrollbarDragging, scrollbarPresence } = this.state;

    if (scrollbarPresence && !scrollbarDragging) {
      this.setState({ scrollbar });
    }
  }

  setScrollbarPresence = (scrollbarPresence) => {
    this.setState({ scrollbarPresence });
  }

  setScrollTop = (scrollTop) => {
    this.listView.current.scrollTop = scrollTop;
  }

  scrollToBottom = () => {
    const { height: listHeight } = this.listScrollable.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();

    if (listHeight > listViewHeight) {
      this.setScrollTop(this.listView.current.scrollHeight);
    }
  }

  calculateScrollbarPosition = (scrollTop) => {
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

  onScroll = (e) => {
    e.preventDefault();
    const { onScroll } = this.props;
    const { scrollTop } = this.listView.current;

    this.calculateScrollbarPosition(scrollTop);

    if (onScroll && isFunciton(onScroll)) {
      onScroll({ scrollTop });
    }
  }

  onResize = (width, height) => {
    const { onResize } = this.props;
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();

    if (height > listViewHeight) {
      this.setScrollbarPresence(true);
      this.calculateScrollbarPosition();
    } else {
      this.setScrollbarPresence(false);
    }

    if (onResize && (isFunciton(onResize))) {
      onResize({ width, height });
    }
  }

  onIntersectionChange = (inView, { target }) => {
    const {
      startFrom,
      fetchMoreThreshold,
      data,
      fetchMore,
    } = this.props;
    const rowIndex = Number(target.getAttribute('row-index'));
    let index = rowIndex;
    let thresholdIndex = data.length - fetchMoreThreshold;

    if (startFrom === 'bottom') {
      index = data.length - rowIndex;
      thresholdIndex = fetchMoreThreshold;
    }

    if ((index === thresholdIndex) && inView) {
      fetchMore();
    }
  }

  render() {
    const { scrollbar, scrollbarPresence } = this.state;
    const {
      loading,
      data,
      fetchMore,
      startFrom,
      rowRenderer,
    } = this.props;

    return (
      <ListWrapper
        onMouseEnter={() => this.setScrollbar(true)}
        onMouseLeave={() => this.setScrollbar(false)}
        onWheel={() => !scrollbar && this.setScrollbar(true)}
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
          <Choose>
            <When condition={!fetchMore && loading}>
              <ListLoading>
                <CircularProgress size={20} color="primary" />
              </ListLoading>
            </When>
            <Otherwise>
              <ListScrollable ref={this.listScrollable}>
                <ReactResizeDetector onResize={this.onResize} handleHeight>
                  <Fragment>
                    <If condition={startFrom === 'bottom'}>
                      <ListFetchMore appeared={loading}>
                        <CircularProgress size={20} color="primary" />
                      </ListFetchMore>
                    </If>
                    <ListItems
                      fetchMore={fetchMore}
                      startFrom={startFrom}
                      data={data}
                      rowRenderer={rowRenderer}
                      onIntersectionChange={this.onIntersectionChange}
                    />
                    <If condition={startFrom === 'top'}>
                      <ListFetchMore appeared={loading}>
                        <CircularProgress size={20} color="primary" />
                      </ListFetchMore>
                    </If>
                  </Fragment>
                </ReactResizeDetector>
              </ListScrollable>
            </Otherwise>
          </Choose>
        </ListView>
      </ListWrapper>
    );
  }
}

List.defaultProps = {
  loading: false,
  data: [],
  fetchMore: false,
  fetchMoreThreshold: 10,
  startFrom: 'top',
  onResize: () => {},
  onScroll: () => {},
};
List.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  fetchMore: PropTypes.bool,
  fetchMoreThreshold: PropTypes.number,
  startFrom: PropTypes.oneOf(['top', 'bottom']),
  onResize: PropTypes.func,
  onScroll: PropTypes.func,
};

export default List;
