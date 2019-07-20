import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';

import List from '@material-ui/core/List';

class ListItems extends PureComponent {
  render() {
    const { data, rowRenderer } = this.props;

    if (isEmpty(data)) {
      return null;
    }
    return (
      <List disablePadding>
        {map(data, (item, index) => rowRenderer(item, index))}
      </List>
    );
  }
}

ListItems.defaultProps = {
  data: [],
};
ListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
};

export default ListItems;
