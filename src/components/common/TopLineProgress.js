import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import LinearProgress from '@material-ui/core/LinearProgress';

const Wrapper = styled.div`
  ${({ height, bordered }) => bordered && position('absolute', `-${height}`, 0, null, 0)}
  height: ${({ height }) => height};
`;

const LinearProgressStyled = styled(LinearProgress)`
  && {
    height: ${({ height }) => height};
  }
`;

const TopLineProgress = ({ height, loading, bordered }) => (
  <Wrapper height={height} bordered={bordered}>
    <If condition={loading}>
      <LinearProgressStyled height={height} color="primary" />
    </If>
  </Wrapper>
);

TopLineProgress.defaultProps = {
  bordered: false,
  height: '2px',
};
TopLineProgress.propTypes = {
  height: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  bordered: PropTypes.bool,
};

export default TopLineProgress;
