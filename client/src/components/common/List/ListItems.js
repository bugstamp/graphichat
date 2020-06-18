import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import styled from 'styled-components';
// import {} from 'polished';

import MaterialList from '@material-ui/core/List';

import { getSpacing } from '../../../styles';

const ListStyled = styled(MaterialList)`
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
    dense,
    disablePadding,
  } = props;

  return (
    <ListStyled
      gutters={gutters}
      disablePadding={disablePadding}
      dense={dense}
    >
      {map(data, rowRenderer)}
    </ListStyled>
  );
};

ListItems.defaultProps = {
  data: [],
  gutters: 0,
  disablePadding: true,
  dense: false,
};
ListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  rowRenderer: PropTypes.func.isRequired,
  gutters: PropTypes.number,
  dense: PropTypes.bool,
  disablePadding: PropTypes.bool,
};

export default ListItems;
