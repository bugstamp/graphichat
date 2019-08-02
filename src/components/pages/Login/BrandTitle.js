import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

import Logo from '../../common/Logo';

import { getSpacing } from '../../../styles';

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: ${getSpacing(1)};
  animation: 1s ${fadeInUpAnimation};
  animation-delay: .5s;
  animation-fill-mode: forwards;
  background: linear-gradient(to right, ${blue[100]} 0%, ${blue[500]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;

  h1 {
    margin-left: ${getSpacing(1)};
    font-weight: bold;
  }
`;

const BrandTitle = () => (
  <Title>
    <Logo fontSize={60} />
    <Typography variant="h1" align="center">GraphiChat</Typography>
  </Title>
);

export default BrandTitle;
