import React from 'react';
import {
  fadeInRight,
  fadeInLeft,
  hinge,
} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { map } from 'lodash';

import Typography from '@material-ui/core/Typography';

import BrandTitle from '../Login/BrandTitle';

import { getStyledProps, getSpacing } from '../../../styles';
import { isEven } from '../../../helpers';

const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const hingeAnimation = keyframes`${hinge}`;

const RegPresentationStyled = styled.div`
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

const SubTitle = styled.div`
  color: #fff;
  text-align: center;
`;

const SubTitleWord = styled(Typography)`
  && {
    display: inline;
    margin-right: ${getSpacing(1)};
    font-weight: bold;
    opacity: 0;
    animation: 1s ${({ even }) => (even === 'even' ? fadeInLeftAnimation : fadeInRightAnimation)};
    animation-delay: ${({ delay }) => `${delay}s`};
    animation-fill-mode: forwards;
  }
`;

const Enjoy = styled.div`
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

const words = ['Simple.', 'Fun.', 'Fast.', 'Useful.', 'Powerful.'];

const RegPresentation = () => (
  <RegPresentationStyled>
    <BrandTitle />
    <SubTitle>
      {
        map(words, (word, index) => {
          const num = index + 1;
          const even = isEven(num) ? 'even' : 'odd';
          const delay = (num / words.length) + 1;

          return (
            <SubTitleWord
              key={num}
              component="p"
              variant="h4"
              align="center"
              even={even}
              delay={delay}
            >
              {word}
            </SubTitleWord>
          );
        })
      }
    </SubTitle>
    <Enjoy>
      <Typography
        component="p"
        variant="h4"
        align="center"
        color="inherit"
      >
        Enjoy!
      </Typography>
    </Enjoy>
  </RegPresentationStyled>
);

export default RegPresentation;
