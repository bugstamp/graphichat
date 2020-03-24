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

export const words = ['Simple.', 'Fun.', 'Fast.', 'Useful.', 'Powerful.'];

export const getWordPropsByIndex = (index) => {
  const num = index + 1;
  const order = isEven(num) ? 'even' : 'odd';
  const delay = (num / words.length) + 1;

  return { order, delay };
};

const RegPresentation = () => (
  <RegPresentationWrapper>
    <BrandTitle />
    <SubTitle>
      {
        map(words, (word, index) => {
          const wordProps = getWordPropsByIndex(index);

          return (
            <SubTitleWord
              key={word}
              component="p"
              variant="h4"
              align="center"
              {...wordProps}
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

export { RegPresentation };

export default memo(RegPresentation);
