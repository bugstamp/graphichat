import React from 'react';
import styled from 'styled-components';
import { size } from 'polished';

const Wrapper = styled.div`
  ${size('100%')}
  text-align: center;
`;

const NotFound = () => (
  <Wrapper>404! Page not found!</Wrapper>
);

export default NotFound;
