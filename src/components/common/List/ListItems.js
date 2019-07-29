import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty, isEqual } from 'lodash';

import List from '@material-ui/core/List';

class ListItems extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      scrollbar,
      scrollbarPresence,
      loading,
      pointerEvents
    } = this.props;

    if (
      !isEqual(loading, nextProps.loading)
      ||
      !isEqual(pointerEvents, nextProps.pointerEvents)
      ||
      !isEqual(scrollbar, nextProps.scrollbar)
      ||
      !isEqual(scrollbarPresence, nextProps.scrollbarPresence)
    ) {
      return false;
    }
    return true;
  }

  render() {
    const { data, rowRenderer } = this.props;

    return (
      <Choose>
        <When condition={isEmpty(data)}>
          {null}
        </When>
        <Otherwise>
          <List disablePadding>
            {map(data, (item, index) => rowRenderer(item, index))}
          </List>
        </Otherwise>
      </Choose>
    );
  }
}

ListItems.defaultProps = {
  loading: false,
  data: [],
  scrollbar: false,
  scrollbarPresence: false,
  pointerEvents: false,
};
ListItems.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  scrollbar: PropTypes.bool,
  scrollbarPresence: PropTypes.bool,
  pointerEvents: PropTypes.bool,
};

export default ListItems;
