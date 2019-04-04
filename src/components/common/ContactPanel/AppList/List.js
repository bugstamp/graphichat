import React from 'react';
import styled from 'styled-components';
import { position } from 'polished';

import List from '@material-ui/core/List';

import { getStyledProps } from '../../../../styles';

export const Wrapper = styled.div`
  flex: 1 auto;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ListStyled = styled(List)`
  && {
    ${position('absolute', 0, '-17px', 0, 0)}
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    transition-duration: ${getStyledProps('theme.transitions.duration.shortest', 'ms')};
    transition-timing-function: ${getStyledProps('theme.transitions.easing.sharp')};
  }
`;

const AppList = ({ children }) => (
  <Wrapper>
    <ListStyled disablePadding>
      {children}
    </ListStyled>
  </Wrapper>
);

export default AppList;
