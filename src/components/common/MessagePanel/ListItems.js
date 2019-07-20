import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import { map, isEmpty } from 'lodash';

import List from '@material-ui/core/List';

class ListItems extends PureComponent {
  rowRenderer = (rowData, index) => {
    const {
      fetchMore,
      startFrom,
      data,
      rowRenderer,
      onIntersectionChange,
    } = this.props;
    const rowIndex = startFrom === 'bottom'
      ? (data.length - index)
      : (index + 1);

    if (fetchMore) {
      return (
        <InView
          key={rowIndex}
          onChange={onIntersectionChange}
          triggerOnce
        >
          {({ ref }) => rowRenderer({ ref, rowIndex, rowData })}
        </InView>
      );
    }
    return rowRenderer({ rowIndex, rowData });
  }

  render() {
    const { data } = this.props;

    if (isEmpty(data)) {
      return null;
    }
    return (
      <List disablePadding>
        {map(data, (item, index) => this.rowRenderer(item, index))}
      </List>
    );
  }
}

ListItems.defaultProps = {
  fetchMore: false,
  startFrom: 'top',
  data: [],
  onIntersectionChange: () => {},
};
ListItems.propTypes = {
  fetchMore: PropTypes.bool,
  startFrom: PropTypes.oneOf(['top', 'bottom']),
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  onIntersectionChange: PropTypes.func,
};

export default ListItems;
