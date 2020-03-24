import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';
import {
  fadeIn,
  fadeInRight,
  fadeInLeft,
  hinge,
} from 'react-animations';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StepLabel from '@material-ui/core/StepLabel';

import { getStyledProps, getSpacing } from '../../../styles';
import bgImage from '../../../assets/images/reg-bg__1920_65.jpg';

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const hingeAnimation = keyframes`${hinge}`;

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

export const RegPresentationWrapper = styled.div`
  flex: 1 60%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');

    return `
      ${smDown} {
        display: none;
      }
    `;
  }}
`;

export const SubTitle = styled.div`
  color: #fff;
  text-align: center;
`;

export const SubTitleWord = styled(Typography)`
  && {
    display: inline;
    margin-right: ${getSpacing(1)};
    font-weight: bold;
    opacity: 0;
    animation: 1s ${({ order }) => (order === 'even' ? fadeInLeftAnimation : fadeInRightAnimation)};
    animation-delay: ${({ delay }) => `${delay}s`};
    animation-fill-mode: forwards;
  }
`;

export const Enjoy = styled.div`
  margin-top: ${getSpacing(3)};
  color: #fff;
  opacity: 0;
  animation: 2s ${hingeAnimation};
  animation-delay: 2s;
  animation-fill-mode: forwards;

  p {
    font-weight: bold;
  }
`;

export const FormWrapper = styled(Paper)`
  && {
    width: 100%;
    max-height: 100%;
    max-width: 375px;
    min-width: 320px;
    position: relative;
    margin: auto 0;
    padding: ${getSpacing(4)} ${getSpacing(3)};
    overflow-y: auto;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const smDown = breakpoints.down('sm');
    const xsDown = breakpoints.down('xs');

    return `
      ${smDown} {
        max-width: 100%;
        height: 100%;
        border-radius: 0;
        padding: ${spacing(4)}px ${spacing(20)}px;
      }
      ${xsDown} {
        padding: ${spacing(2)}px;
      }
    `;
  }}
  }
`;

export const FormHeader = styled(Typography)`
  && {
    width: 100%;
    position: relative;
  }
`;

export const FormInfo = styled(Typography)`
  && {
    text-align: center;
  }
`;

export const FormFooter = styled(Typography)`
  && {
    width: 100%;
    margin-top: ${getSpacing(2)};
  }
`;

export const StepLabelStyled = styled(StepLabel)`
  p {
    width: 100%;
  }
`;
