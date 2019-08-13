import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty, isEqual } from 'lodash';
import styled from 'styled-components';
// import {} from 'polished';

import MaterialList from '@material-ui/core/List';

import { getSpacing } from '../../../styles';

const List = styled(MaterialList)`
  && {
    ${({ gutters, ...rest }) => `
      padding: 0 ${getSpacing(gutters)(rest)};
    `}
  }
`;

class ListItems extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      scrollbar,
      scrollbarPresence,
      loading,
      pointerEvents,
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
    const {
      data,
      rowRenderer,
      gutters,
      disablePadding,
      dense,
    } = this.props;

    return (
      <Choose>
        <When condition={isEmpty(data)}>
          {null}
        </When>
        <Otherwise>
          <List
            gutters={gutters}
            disablePadding={disablePadding}
            dense={dense}
          >
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
  gutters: 0,
  disablePadding: true,
  dense: false,
};
ListItems.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  scrollbar: PropTypes.bool,
  scrollbarPresence: PropTypes.bool,
  pointerEvents: PropTypes.bool,
  gutters: PropTypes.number,
  disablePadding: PropTypes.bool,
  dense: PropTypes.bool,
};

export default ListItems;
