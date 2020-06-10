import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { getStyledProps } from '../../../styles';

const AppGrid = styled(Grid)`
  background-color: ${getStyledProps('theme.palette.grey.300')};
`;

const AppContainer = styled(Paper)`
  && {
    flex: 1 auto;
    display: flex;
    overflow: hidden;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const lgUp = breakpoints.up('lg');
    const mdDown = breakpoints.down('md');

    return `
      ${lgUp} {
        margin: 20px 40px;
      }
      ${mdDown} {
        border-radius: 0;
      }
    `;
  }};
  }
`;

export {
  AppGrid,
  AppContainer,
};
