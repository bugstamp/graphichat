import styled from 'styled-components';

import DialogContent from '@material-ui/core/DialogContent';

import { SearchBoxStyled } from '../../../../../common/SearchBox/styled';
import { getStyledProps, getSpacing } from '../../../../../../styles';

export const SearchDialogContentStyled = styled(DialogContent)`
  && {
    flex: 1 auto;
    display: flex;
    flex-flow: column;
    padding: ${getSpacing(2)} ${getSpacing(3)};
    padding-bottom: 0;

    ${SearchBoxStyled} {
      margin-bottom: ${getSpacing(2)}
    }

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${SearchBoxStyled} {
        margin-bottom: ${getSpacing(1)}
      }
      ${smDown} {
        padding: ${spacing(1)}px ${spacing(2)}px;
      }
    `;
  }}
  }
`;

export default null;
