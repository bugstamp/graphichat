import styled from 'styled-components';

import DialogTitle from '@material-ui/core/DialogTitle';

import { getStyledProps } from '../../../../../styles';

export const SearchDialogTitleStyled = styled(DialogTitle)`
  && {
  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
  }
`;

export default null;
