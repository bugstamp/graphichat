import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getStyledProps } from '../../../../styles';

export const ContactsStyled = styled(Paper)`
  && {
    position: relative;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${getStyledProps('theme.palette.background.default')};
    border-left: 1px solid ${getStyledProps('theme.palette.grey.200')};
    border-right: 1px solid ${getStyledProps('theme.palette.grey.200')};
  }
`;

export const NoContactsStyled = styled(Typography)`
  && {
    p {
      text-align: center;
    }
  }
`;
