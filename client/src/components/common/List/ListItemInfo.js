import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsis } from 'polished';

import ListItemText from '@material-ui/core/ListItemText';

import { getSpacing } from '../../../styles';

const ListItemTextStyled = styled(ListItemText)`
  && {
    display: inline-flex;
    flex-flow: column;
    padding: 0 ${getSpacing(1)};

    > * {
      ${ellipsis('100%')};
    }
  }
`;

const ListItemInfo = ({ primary, secondary }) => (
  <ListItemTextStyled primary={primary} secondary={secondary} />
);

ListItemInfo.defaultProps = {
  primary: '',
  secondary: '',
};
ListItemInfo.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
};

export default ListItemInfo;
