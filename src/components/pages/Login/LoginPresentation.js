import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeIn, headShake } from 'react-animations';

import Typography from '@material-ui/core/Typography';

import BrandTitle from './BrandTitle';

import { getStyledProps, getSpacing } from '../../../styles';

const fadeInAnimation = keyframes`${fadeIn}`;
const headShakeAnimation = keyframes`${headShake}`;

const Wrapper = styled.div`
  flex: 1 auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
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
    border: none;
    outline: none;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    animation: 1.5s ${headShakeAnimation};
    animation-delay: 2.5s;
    animation-iteration-count: ${({ stopShake }) => (stopShake ? 0 : 'infinite')};
    animation-play-state: ${({ stopShake }) => (stopShake ? 'paused' : 'running')};
    z-index: 0;

    &:hover {
      color: ${getStyledProps('theme.palette.primary.main')}
    }
  }
`;

const LoginPresentation = ({ formDrawer, toggleFormDrawer }) => {
  return (
    <Wrapper>
      <BrandTitle />
      <SubTitle stopShake={formDrawer}>
        <Typography component="p" variant="h4" align="center" paragraph>
          {'A lightweight, simple and useful web chat app'}
          {' based on the modern GraphQL API'}
        </Typography>
        <button type="button" onClick={toggleFormDrawer}>
          <Typography component="p" variant="h4" align="center">Try it now!</Typography>
        </button>
      </SubTitle>
    </Wrapper>
  );
};

LoginPresentation.propTypes = {
  formDrawer: PropTypes.bool.isRequired,
  toggleFormDrawer: PropTypes.func.isRequired,
};

export default LoginPresentation;
