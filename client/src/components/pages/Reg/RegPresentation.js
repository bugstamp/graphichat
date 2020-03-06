import React, { memo } from 'react';
import { map } from 'lodash';

import Typography from '@material-ui/core/Typography';

import BrandTitle from '../Login/BrandTitle';

import {
  RegPresentationWrapper,
  SubTitle,
  SubTitleWord,
  Enjoy,
} from './styled';
import { isEven } from '../../../helpers';

const words = ['Simple.', 'Fun.', 'Fast.', 'Useful.', 'Powerful.'];

const RegPresentation = () => (
  <RegPresentationWrapper>
    <BrandTitle />
    <SubTitle>
      {
        map(words, (word, index) => {
          const num = index + 1;
          const even = isEven(num) ? 'even' : 'odd';
          const delay = (num / words.length) + 1;

          return (
            <SubTitleWord
              key={word}
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
  </RegPresentationWrapper>
);

export default memo(RegPresentation);
