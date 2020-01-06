import React from 'react';
import { shallow } from 'enzyme';

import ImagePreloader from './ImagePreloader';

describe('test ImagePreloader.js', () => {
  test('snapshot testing', () => {
    const wrapper = shallow(<ImagePreloader />);

    expect(wrapper).toMatchSnapshot();
  });
});
