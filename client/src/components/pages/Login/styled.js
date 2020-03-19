import { fadeInUp, fadeIn, headShake } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { backgrounds } from 'polished';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import blue from '@material-ui/core/colors/blue';

import { getStyledProps, getSpacing } from '../../../styles';
import bgImage from '../../../assets/images/login-bg__1920_65.jpg';

const fadeInUpAnimation = keyframes`${fadeInUp}`;
const fadeInAnimation = keyframes`${fadeIn}`;
const headShakeAnimation = keyframes`${headShake}`;

export const LoginWrapper = styled(Grid)`
  flex: 1 auto;
  display: flex;
  position: relative;
  ${backgrounds(`url(${bgImage})`, 'no-repeat')};
  background-size: cover;
  background-position: center;
`;

export const BrandTitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: ${getSpacing(2)};
  animation: 1s ${fadeInUpAnimation};
  animation-delay: .5s;
  animation-fill-mode: forwards;
  opacity: 0;

  p {
    margin-left: ${getSpacing(1)};
    font-weight: bold;
    background: linear-gradient(to right, ${blue[100]} 0%, ${blue[500]} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;


export const LoginPresentationWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const SubTitle = styled.div`
  animation: 1s ${fadeInAnimation};
  animation-delay: 1s;
  animation-fill-mode: forwards;
  color: #fff;
  padding: 0 ${getSpacing(1)};
  text-align: center;
  opacity: 0;

  p {
    font-weight: bold;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');
    const fontSize = getStyledProps('theme.typography.h5.fontSize')(props);

    return `
      ${smDown} {
        font-size: ${fontSize};
      }
    `;
  }};
  }

  button {
    display: inline-block;
    position: relative;
    border: none;
    outline: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    z-index: 0;
    -webkit-transform: translate3d(0,0,0);
    animation-name: ${({ stopAnimation }) => (!stopAnimation && headShakeAnimation)};
    animation-duration: 1.5s;
    animation-delay: 2.5s;
    animation-iteration-count: infinite;

    &:hover {
      color: ${getStyledProps('theme.palette.primary.main')}
    }

    p {
      display: inherit;
    }
  }
`;

export const LoginFormWrapper = styled.div`
  && {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 375px;
    min-width: 320px;
    position: relative;
    padding: ${getSpacing(5)} ${getSpacing(3)};
    overflow: hidden auto;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const spacing = getStyledProps('theme.spacing')(props);
    const xsDown = breakpoints.down('xs');

    return `
      ${xsDown} {
        max-width: 100%;
        padding: ${spacing(2)}px;
      }
    `;
  }}
  }
`;

export const Header = styled(Typography)`
  width: 100%;
  position: relative;
  text-align: center;
`;

export const SignUpButton = styled(Button)`
  && {
    margin-top: 1em;
  }
`;
