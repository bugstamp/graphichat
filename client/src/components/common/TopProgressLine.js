import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import LinearProgress from '@material-ui/core/LinearProgress';

const Wrapper = styled.div`
  ${({ height, bordered }) => position('absolute', `${bordered ? `-${height}` : 0}`, 0, null, 0)}
  height: ${({ height }) => height};
  overflow: hidden;
`;

const LinearProgressStyled = styled(LinearProgress)`
  && {
    height: ${({ height }) => height};
  }
`;

const TopProgressLine = ({ height, loading, bordered }) => (
  <Wrapper height={height} bordered={bordered}>
    <If condition={loading}>
      <LinearProgressStyled height={height} color="primary" />
    </If>
  </Wrapper>
);

TopProgressLine.defaultProps = {
  loading: false,
  bordered: false,
  height: '3px',
};
TopProgressLine.propTypes = {
  loading: PropTypes.bool,
  bordered: PropTypes.bool,
  height: PropTypes.string,
};

export default memo(TopProgressLine);
