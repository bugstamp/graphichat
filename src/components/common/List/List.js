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

import { getStyledProps } from '../../../styles';

const Wrapper = styled.div`
  flex: 1 auto;
  position: relative;
  overflow: hidden;
`;

const View = styled.div`
  ${position('absolute', 0, 0, 0, 0)};
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 15;

  ${({ startFrom }) => startFrom === 'bottom' && `
    display: flex;
    flex-flow: column;
  `}

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const { scrollbarPresence } = props;
    const lgUp = breakpoints.up('lg');

    return `
      ${lgUp} {
        right: ${!scrollbarPresence ? 0 : '-17px'};
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

const Scrollbar = styled.div`
  ${position('absolute', 0, 0, 0, null)};
  width: 3px;
  display: none;
  background-color: ${getStyledProps('theme.palette.grey.300')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: .25s ease;
  z-index: 20;
  cursor: pointer;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const { presence } = props;
    const lgUp = breakpoints.up('lg');

    return `
      ${lgUp} {
        display: ${(presence ? 'block' : 'none')};
      }
    `;
  }}
`;

const ScrollbarThumb = styled.button`
  width: 100%;
  position: relative;
  padding: 0;
  background-color: ${getStyledProps('theme.palette.primary.main')};
  border: none;
  will-change: transform;
  cursor: pointer;
`;

const FetchMore = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visible }) => (visible ? 'visibility' : 'hidden')}
`;

const Loading = styled.div`
  ${position('absolute', '50%', null, null, '50%')};
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

  componentDidUpdate(prevProps) {
    const { loading, data, lazyLoad } = this.props;

    if (
      (!isEqual(prevProps.data, data) && isEmpty(data))
      ||
      (!isEqual(prevProps.loading, loading) && loading && !lazyLoad)
    ) {
      this._setScrollbarPresence(false);
    }
  }

  _toggleScrollbarDragging = () => {
    this.setState(({ scrollbarDragging }) => ({ scrollbarDragging: !scrollbarDragging }));
  }

  getListHeight = () => this.listScrollable.current.getBoundingClientRect().height || 0;

  getListViewHeight = () => this.listView.current.getBoundingClientRect().height || 0;

  getScrollTop = () => this.listView.current.scrollTop;

  _setScrollbar = (scrollbar) => {
    const { scrollbarDragging, scrollbarPresence } = this.state;

    if (scrollbarPresence && !scrollbarDragging) {
      this.setState({ scrollbar });
    }
  }

  _setScrollbarPresence = (scrollbarPresence) => {
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

  _calculateScrollbarPosition = (scrollTop) => {
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

      this.listView.current.scrollTop = nextScrollTop;
    };

    const onMouseUp = () => {
      this._toggleScrollbarDragging();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  _onScroll = (e) => {
    e.preventDefault();
    const { onScroll } = this.props;
    const { scrollTop } = this.listView.current;
    let timer;

    clearTimeout(timer);
    this.enablePointerEvents();
    timer = this.disablePointerEvents();

    this._calculateScrollbarPosition(scrollTop);

    if (onScroll && isFunction(onScroll)) {
      onScroll({ scrollTop });
    }
  }

  disablePointerEvents = () => {
    const { pointerEvents } = this.props;

    if (pointerEvents) {
      this.setState({ pointerEvents: false });
    }
  }

  enablePointerEvents = debounce(() => {
    this.setState({ pointerEvents: true });
  }, 500);

  _onResize = (width, height) => {
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

    if (lazyLoad) {
      return (
        <InView
          key={rowIndex}
          onChange={this._onObserverChange}
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
      noContentComponent: NoContent,
      spinnerSize,
      listProps,
    } = this.props;

    return (
      <Wrapper
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
      >
        <Scrollbar show={scrollbar} presence={scrollbarPresence}>
          <ScrollbarThumb
            ref={this.scrollbarThumb}
            type="button"
            onDragStart={() => false}
            onMouseDown={this.onMouseDown}
          />
        </Scrollbar>
        <View
          ref={this.listView}
          onScroll={this._onScroll}
          startFrom={startFrom}
          scrollbarPresence={scrollbarPresence}
        >
          <Choose>
            <When condition={!lazyLoad && loading}>
              <Loading>
                <CircularProgress size={spinnerSize} color="primary" />
              </Loading>
            </When>
            <When condition={!loading && isEmpty(data)}>
              <Choose>
                <When condition={NoContent}>
                  <NoContentWrapper>
                    <NoContent />
                  </NoContentWrapper>
                </When>
                <Otherwise>
                  {null}
                </Otherwise>
              </Choose>
            </When>
            <Otherwise>
              <Scrollable
                ref={this.listScrollable}
                pointer={pointerEvents}
              >
                <ReactResizeDetector onResize={this._onResize} handleHeight>
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
                      listProps={listProps}
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
  fetchMoreThreshold: 10,
  startFrom: 'top',
  onResize: null,
  onScroll: null,
  noContentComponent: null,
  spinnerSize: 20,
  onObserverChange: null,
  listProps: {},
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
};

export default List;
