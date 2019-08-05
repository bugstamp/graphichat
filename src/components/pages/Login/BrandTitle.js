import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Logo from '../../common/Logo';

import { getSpacing } from '../../../styles';

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: ${getSpacing(2)};
  animation: 1s ${fadeInUpAnimation};
  animation-delay: .5s;
  animation-fill-mode: forwards;
  background: linear-gradient(to right, ${blue[100]} 0%, ${blue[500]} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;

  p {
    margin-left: ${getSpacing(1)};
    font-weight: bold;
  }
`;

const BrandTitle = () => {
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const downSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  let logoSize = 60;
  let typographyVariant = 'h1';
  if (downMd) {
    logoSize = 35;
    typographyVariant = 'h2';
  }
  if (downSm) {
    typographyVariant = 'h3';
  }

  return (
    <Title>
      <Logo size={logoSize} />
      <Typography component="p" variant={typographyVariant} align="center">GraphiChat</Typography>
    </Title>
  );
};

export default BrandTitle;
