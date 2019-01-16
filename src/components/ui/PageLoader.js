import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { position } from 'polished';

const Wrapper = styled.div`
  ${position('absolute', '50%', null, null, '50%')}
  transform: translate(-50%, -50%);
`;

const PageLoader = () => (
  <Wrapper>
    <CircularProgress size={80} />
  </Wrapper>
);

export default PageLoader;
