import React from 'react';
import { shallow } from 'enzyme';

import Typography from '@material-ui/core/Typography';

import RegPresentation, { words, getWordPropsByIndex } from './RegPresentation';
import BrandTitle from '../Login/BrandTitle';
import {
  SubTitle,
  SubTitleWord,
  Enjoy,
} from './styled';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';

describe('RegPresentation', () => {
  const mountWrapper = () => mountMockedProvider(<RegPresentation />);
  const wrapper = mountWrapper();

  test('should match to snapshot', () => {
    expect(shallow(<RegPresentation />)).toMatchSnapshot();
  });
  test('should mount without errors', () => {
    expect(wrapper.find(RegPresentation)).toHaveLength(1);
  });
  test('should have BrandTitle', () => {
    expect(wrapper.find(BrandTitle)).toHaveLength(1);
  });
  describe('SubTitle', () => {
    const SubTitleWords = wrapper.find(SubTitleWord);

    test('should be', () => {
      expect(wrapper.find(SubTitle)).toHaveLength(1);
    });
    test('should have correct amount of SubTitleWords', () => {
      expect(SubTitleWords).toHaveLength(words.length);
    });
    test('SubTitleWords text should be match to words array', () => {
      const texts = SubTitleWords.map(w => w.text());

      expect(texts).toEqual(expect.arrayContaining(words));
    });
    test('SubTitleWords static props', () => {
      SubTitleWords.forEach((w) => {
        expect(w.props()).toMatchObject({
          component: 'p',
          variant: 'h4',
          align: 'center',
        });
      });
    });
    test('SubTitleWords order and delay dynamic props', () => {
      SubTitleWords.forEach((w, index) => {
        const { order, delay } = getWordPropsByIndex(index);

        expect(w.prop('order')).toEqual(order);
        expect(w.prop('delay')).toEqual(delay);
      });
    });
  });
  describe('Enjoy', () => {
    const EnjoyWrapper = wrapper.find(Enjoy);

    test('should be', () => {
      expect(EnjoyWrapper).toHaveLength(1);
    });
    test('should have child paragraph with correct props', () => {
      expect(EnjoyWrapper.find(Typography)).toHaveLength(1);
      expect(EnjoyWrapper.find(Typography).props()).toMatchObject({
        component: 'p',
        variant: 'h4',
        align: 'center',
        color: 'inherit',
        children: 'Enjoy!',
      });
    });
  });
});
