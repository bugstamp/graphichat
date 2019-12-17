import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { theme } from '../styles';

describe('test App.js', () => {
  test('snapshot testing', () => {
    const wrapper = shallow(<App theme={theme} />);

    expect(wrapper).toMatchSnapshot();
  });
});
