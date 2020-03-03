import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';
import { fadeIn } from 'react-animations';

import Grid from '@material-ui/core/Grid';

import { getStyledProps } from '../../../styles';
import bgImage from '../../../assets/images/reg-bg__1920_65.jpg';

const fadeInAnimation = keyframes`${fadeIn}`;

export const RegWrapper = styled(Grid)`
  && {
    flex: 1 auto;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    ${backgrounds(`url(${bgImage})`, 'no-repeat')}
    background-size: cover;
    background-position: center;
    overflow: hidden;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        flex-flow: column;
      }
    `;
  }}
  }
`;

export const RegFormWrapper = styled.div`
  flex: 1 40%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: 1.5s ${fadeInAnimation};
  animation-delay: 1s;
  animation-fill-mode: forwards;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        animation-play-state: paused;
        opacity: 1;
      }
    `;
  }}
`;
