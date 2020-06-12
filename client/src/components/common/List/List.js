import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import { size, position } from 'polished';
import { isEmpty, isEqual, isFunction } from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';

import ListItems from './ListItems';
import ListEmpty from './ListEmpty';

import { getStyledProps } from '../../../styles';

const Wrapper = styled.div`
  flex: 1 auto;
  position: relative;
  overflow: hidden;
`;

const View = styled.div`
  ${position('absolute', 0, 0, 0, 0)};
  overflow: hidden auto;
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
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const FetchMore = styled.div`
  order: ${({ startFrom }) => (startFrom === 'bottom' ? 0 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ visible }) => (visible ? 'visibility' : 'hidden')};

  * {
    animation-play-state: ${({ visible }) => (visible ? 'running' : 'paused')} !important;
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.listWrapper = createRef();
    this.listView = createRef();
    this.listScrollable = createRef();
  }

  getSnapshotBeforeUpdate(nextProps) {
    const { lazyLoad, data } = this.props;
    const snapshot = {
      prevScrollHeight: null,
    };

    if (!isEqual(nextProps.data, data) && lazyLoad) {
      const scrollTop = this.getScrollTop();
      const { scrollHeight } = this.listScrollable.current;

      snapshot.prevScrollHeight = scrollHeight - scrollTop;
    }
    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { prevScrollHeight } = snapshot;

    if (prevScrollHeight) {
      const { scrollHeight } = this.listScrollable.current;
      const nextScrollTop = scrollHeight - prevScrollHeight;

      this.setScrollTop(nextScrollTop);
    }
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

  _onScroll = () => {
    const { onScroll } = this.props;

    if (onScroll && isFunction(onScroll)) {
      const { scrollTop } = this.listView.current;

      onScroll({ scrollTop });
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
    const rowIndex = +target.getAttribute('row-index');
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
    const view = this.listView.current || {};
    const viewHeight = view.offsetHeight || 0;
    const verticalMargin = viewHeight * 0.5;
    const rootMargin = `${verticalMargin}px 0px ${verticalMargin}px 0px`;

    if (lazyLoad) {
      return (
        <InView
          key={id}
          root={this.listView.current}
          onChange={this._onObserverChange}
          rootMargin={rootMargin}
          triggerOnce
        >
          {({ ref }) => rowRenderer({ ref, ...rowProps })}
        </InView>
      );
    }
    return rowRenderer(rowProps);
  }

  render() {
    const {
      loading,
      data,
      lazyLoad,
      startFrom,
      noContentComponent,
      spinnerSize,
      gutters,
      dense,
    } = this.props;

    return (
      <Wrapper ref={this.listWrapper}>
        <View
          ref={this.listView}
          onScroll={this._onScroll}
          startFrom={startFrom}
        >
          <Choose>
            <When condition={isEmpty(data)}>
              <ListEmpty
                loading={!lazyLoad && loading}
                spinnerSize={spinnerSize}
                noContentComponent={noContentComponent}
              />
            </When>
            <Otherwise>
              <Scrollable ref={this.listScrollable}>
                <FetchMore visible={loading} startFrom={startFrom}>
                  <CircularProgress size={spinnerSize} color="primary" />
                </FetchMore>
                <ListItems
                  loading={loading}
                  data={data}
                  rowRenderer={this._onRowRenderer}
                  gutters={gutters}
                  dense={dense}
                />
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
  fetchMoreThreshold: 5,
  startFrom: 'top',
  spinnerSize: 32,
  noContentComponent: null,
  onObserverChange: null,
  onScroll: null,
  gutters: 0,
  dense: false,
};
List.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  lazyLoad: PropTypes.bool,
  fetchMore: PropTypes.func,
  fetchMoreThreshold: PropTypes.number,
  startFrom: PropTypes.oneOf(['top', 'bottom']),
  onScroll: PropTypes.func,
  noContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  spinnerSize: PropTypes.number,
  onObserverChange: PropTypes.func,
  gutters: PropTypes.number,
  dense: PropTypes.bool,
};

export default List;
