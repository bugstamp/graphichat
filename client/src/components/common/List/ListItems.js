import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
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

const ListItems = (props) => {
  const {
    data,
    rowRenderer,
    gutters,
    disablePadding,
    dense,
  } = props;

  return (
    <List
      gutters={gutters}
      disablePadding={disablePadding}
      dense={dense}
    >
      {map(data, (item, index) => rowRenderer(item, index))}
    </List>
  );
};

ListItems.defaultProps = {
  data: [],
  gutters: 1,
  disablePadding: true,
  dense: false,
};
ListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  gutters: PropTypes.number,
  disablePadding: PropTypes.bool,
  dense: PropTypes.bool,
};

export default ListItems;
