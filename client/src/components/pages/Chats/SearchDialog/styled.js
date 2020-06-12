import styled from 'styled-components';

import { getStyledProps } from '../../../../styles';

export const SearchDialogBodyStyled = styled.div`
  && {
    display: flex;
    flex-flow: column;
    background-color: #fff;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const borderRadius = getStyledProps('theme.shape.borderRadius')(props);
    const shadows = getStyledProps('theme.shadows[1]')(props);
    const mdUp = breakpoints.up('md');

    return `
      ${mdUp} {
        min-height: 500px;
        border-radius: ${borderRadius}px;
        box-shadow: ${shadows};
      }
    `;
  }}
  }
`;

export default null;
