import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import { size, position } from 'polished';
import {
  debounce, isEmpty, isEqual, isFunction,
} from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';

import ListItems from './ListItems';
import ListScrollbar from './ListScrollbar';
import ListEmpty from './ListEmpty';

import { getStyledProps } from '../../../styles';

const Wrapper = styled.div`
  flex: 1 auto;
  position: relative;
  overflow: hidden;
`;

const View = styled.div`
  ${position('absolute', 0, '-17px', 0, 0)};
  overflow-y: scroll;
  z-index: 15;

  ${({ startFrom }) => startFrom === 'bottom' && `
    display: flex;
    flex-flow: column;
  `}

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const mdDown = breakpoints.down('md');

    return `
      ${mdDown} {
        width: 100%;
        height: 100%:
        right: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: contain;
      }
    `;
  }}
`;

export const NoContentWrapper = styled.div`
  ${size('100%')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Scrollable = styled.div`
  width: 100%;
  margin-top: auto;

  ${({ pointer }) => {
    const pointerEvents = !pointer ? 'none !important' : 'auto';

    return `
      pointer-events: ${pointerEvents};

      * {
        pointer-events: ${pointerEvents};
      }
    `;
  }};
`;

const FetchMore = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visible }) => (visible ? 'visibility' : 'hidden')};

  > div {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.listWrapper = createRef();
    this.listView = createRef();
    this.listScrollable = createRef();
    this.scrollbarThumb = createRef();

    this.state = {
      scrollbar: false,
      scrollbarPresence: false,
      scrollbarDragging: false,
      pointerEvents: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { scrollbarDragging } = this.state;

    if (!isEqual(scrollbarDragging, nextState.scrollbarDragging)) {
      return false;
    }
    return true;
  }

  getSnapshotBeforeUpdate(nextProps) {
    const { lazyLoad, data } = this.props;
    const result = {
      prevScrollHeight: null,
    };

    if (!isEqual(nextProps.data.length, data.length) && lazyLoad) {
      const scrollTop = this.getScrollTop();
      const { scrollHeight } = this.listScrollable.current;

      result.prevScrollHeight = scrollHeight - scrollTop;
    }
    return result;
  }

  componentDidUpdate(prevProps, prevState, { prevScrollHeight }) {
    const {
      loading,
      data,
      lazyLoad,
    } = this.props;

    if (
      (!isEqual(prevProps.data.length, data.length) && isEmpty(data))
      ||
      (!isEqual(prevProps.loading, loading) && loading && !lazyLoad)
    ) {
      this._setScrollbarPresence(false);
    }

    if (prevScrollHeight) {
      const { scrollHeight } = this.listScrollable.current;
      const nextScrollTop = scrollHeight - prevScrollHeight;

      this.setScrollTop(nextScrollTop);
    }
  }

  _toggleScrollbarDragging = () => {
    this.setState(({ scrollbarDragging }) => ({ scrollbarDragging: !scrollbarDragging }));
  }

  getListHeight = () => this.listScrollable.current.getBoundingClientRect().height || 0;

  getListViewHeight = () => this.listView.current.getBoundingClientRect().height || 0;

  getScrollTop = () => this.listView.current.scrollTop;

  getScrollHeight = () => this.listView.current.scrollHeight;

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

  _setScrollbar = (scrollbar) => {
    const { scrollbarDragging, scrollbarPresence } = this.state;

    if (scrollbarPresence && !scrollbarDragging) {
      this.setState({ scrollbar });
    }
  }

  _setScrollbarPresence = (scrollbarPresence) => {
    this.setState({ scrollbarPresence });
  }

  _calculateScrollbarPosition = () => {
    const { height: listHeight } = this.listScrollable.current.getBoundingClientRect();
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();
    const { scrollTop } = this.listView.current;
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

    this._toggleScrollbarDragging();

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

      this.setScrollTop(nextScrollTop);
    };

    const onMouseUp = () => {
      this._toggleScrollbarDragging();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  _onScroll = () => {
    const { onScroll } = this.props;
    let timer;

    clearTimeout(timer);
    this._enablePointerEvents();
    timer = this._disablePointerEvents();

    this._calculateScrollbarPosition();

    if (onScroll && isFunction(onScroll)) {
      const { scrollTop } = this.listView.current;

      onScroll({ scrollTop });
    }
  }

  _disablePointerEvents = () => {
    const { pointerEvents } = this.state;

    if (pointerEvents) {
      this.setState({ pointerEvents: false });
    }
  }

  _enablePointerEvents = debounce(() => {
    this.setState({ pointerEvents: true });
  }, 500);

  _onScrollableResize = (width, height) => {
    const { onResize } = this.props;
    const { height: listViewHeight } = this.listView.current.getBoundingClientRect();

    if (height > listViewHeight) {
      this._setScrollbarPresence(true);
      this._calculateScrollbarPosition();
    } else {
      this._setScrollbarPresence(false);
    }

    if (onResize && (isFunction(onResize))) {
      onResize({ width, height });
    }
  }

  _onViewResize = (width, height) => {
    if (this.listScrollable.current) {
      const { height: listScrollableHeight } = this.listScrollable.current.getBoundingClientRect();

      if (listScrollableHeight > height) {
        this._setScrollbarPresence(true);
      } else {
        this._setScrollbarPresence(false);
      }
    }
  }

  _onObserverChange = (inView, { target }) => {
    const {
      data,
      startFrom,
      fetchMore,
      fetchMoreThreshold,
      onObserverChange,
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

    if (onObserverChange) {
      onObserverChange();
    }
  }

  _onRowRenderer = (rowData, index) => {
    const {
      lazyLoad,
      startFrom,
      data,
      rowRenderer,
    } = this.props;
    const rowIndex = startFrom === 'bottom'
      ? (data.length - index)
      : (index + 1);
    const rowProps = {
      index,
      rowIndex,
      rowData,
    };
    const { id } = rowData;

    if (lazyLoad) {
      return (
        <InView
          key={id}
          onChange={this._onObserverChange}
          rootMargin="80px"
          triggerOnce
        >
          {({ ref }) => rowRenderer({ ref, ...rowProps })}
        </InView>
      );
    }
    return rowRenderer(rowProps);
  }

  onMouseEnter = (e) => {
    e.preventDefault();
    this._setScrollbar(true);
  }

  onMouseLeave = (e) => {
    e.preventDefault();
    this._setScrollbar(false);
  }

  onMouseOver = (e) => {
    e.preventDefault();
    const { scrollbar } = this.state;

    if (!scrollbar) {
      this._setScrollbar(true);
    }
  }

  render() {
    const { scrollbar, scrollbarPresence, pointerEvents } = this.state;
    const {
      loading,
      data,
      lazyLoad,
      startFrom,
      noContentComponent,
      spinnerSize,
      listProps,
    } = this.props;

    return (
      <Wrapper
        ref={this.listWrapper}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
      >
        <ListScrollbar
          ref={this.scrollbarThumb}
          show={scrollbar}
          presence={scrollbarPresence}
          onMouseDown={this.onMouseDown}
        />
        <View
          ref={this.listView}
          onScroll={this._onScroll}
          startFrom={startFrom}
          scrollbarPresence={scrollbarPresence}
        >
          <ReactResizeDetector onResize={this._onViewResize} handleHeight>
            <Choose>
              <When condition={isEmpty(data)}>
                <ListEmpty
                  loading={!lazyLoad && loading}
                  spinnerSize={spinnerSize}
                  noContentComponent={noContentComponent}
                />
              </When>
              <Otherwise>
                <Scrollable
                  ref={this.listScrollable}
                  pointer={pointerEvents}
                >
                  <ReactResizeDetector onResize={this._onScrollableResize} handleHeight>
                    <Fragment>
                      <If condition={lazyLoad && startFrom === 'bottom'}>
                        <FetchMore visible={loading}>
                          <CircularProgress size={spinnerSize} color="primary" />
                        </FetchMore>
                      </If>
                      <ListItems
                        scrollbar={scrollbar}
                        scrollbarPresence={scrollbarPresence}
                        loading={loading}
                        pointerEvents={pointerEvents}
                        data={data}
                        rowRenderer={this._onRowRenderer}
                        {...listProps}
                      />
                      <If condition={lazyLoad && startFrom === 'top'}>
                        <FetchMore visible={loading}>
                          <CircularProgress size={spinnerSize} color="primary" />
                        </FetchMore>
                      </If>
                    </Fragment>
                  </ReactResizeDetector>
                </Scrollable>
              </Otherwise>
            </Choose>
          </ReactResizeDetector>
        </View>
      </Wrapper>
    );
  }
}

List.defaultProps = {
  loading: false,
  data: [],
  lazyLoad: false,
  fetchMore: null,
  fetchMoreThreshold: 5,
  startFrom: 'top',
  onResize: null,
  onScroll: null,
  noContentComponent: null,
  spinnerSize: 20,
  onObserverChange: null,
  listProps: {},
  scrollToBottomAfterMount: false,
};
List.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  lazyLoad: PropTypes.bool,
  fetchMore: PropTypes.func,
  fetchMoreThreshold: PropTypes.number,
  startFrom: PropTypes.oneOf(['top', 'bottom']),
  onResize: PropTypes.func,
  onScroll: PropTypes.func,
  noContentComponent: PropTypes.func,
  spinnerSize: PropTypes.number,
  onObserverChange: PropTypes.func,
  listProps: PropTypes.objectOf(PropTypes.any),
  scrollToBottomAfterMount: PropTypes.bool,
};

export default List;
