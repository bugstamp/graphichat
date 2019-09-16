import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size } from 'polished';

import CircularProgress from '@material-ui/core/CircularProgress';

export const Wrapper = styled.div`
  ${size('100%')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListEmpty = ({
  loading,
  spinnerSize,
  noContentComponent: NoContentComponent,
}) => (
  <Wrapper>
    <Choose>
      <When condition={loading}>
        <CircularProgress size={spinnerSize} color="primary" />
      </When>
      <When condition={NoContentComponent}>
        <NoContentComponent />
      </When>
      <Otherwise>
        {null}
      </Otherwise>
    </Choose>
  </Wrapper>
);

ListEmpty.defaultProps = {
  noContentComponent: null,
};
ListEmpty.propTypes = {
  loading: PropTypes.bool.isRequired,
  spinnerSize: PropTypes.number.isRequired,
  noContentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
};

export default ListEmpty;
