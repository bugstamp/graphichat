import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';

import BrandTitle from './BrandTitle';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';
import mockedUseMediaQuery from '../../../__mocks__/@material-ui/core/useMediaQuery';

describe('LoginPresentation', () => {
  const mountWrapper = () => mountMockedProvider(<BrandTitle />);

  test('should match to snapshot', () => {
    const wrapper = shallow(<BrandTitle />);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount should be without errors', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('BrandTitle')).toHaveLength(1);
  });
  test('should have Logo', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('Logo')).toHaveLength(1);
  });
  test('logoSize and typographyVariant definition', () => {
    mockedUseMediaQuery.mockImplementation(() => false);
    const wrapper = mountWrapper();

    expect(wrapper.find('Logo').prop('size')).toBe(60);
    expect(wrapper.find(Typography).prop('variant')).toBe('h1');

    wrapper.unmount();
    mockedUseMediaQuery.mockImplementation(() => true);
    wrapper.mount();

    expect(wrapper.find('Logo').prop('size')).toBe(35);
    expect(wrapper.find(Typography).prop('variant')).toBe('h3');
  });
  test('typography props', () => {
    mockedUseMediaQuery.mockImplementation(() => false);
    const wrapper = mountWrapper();

    expect(wrapper.find(Typography).props()).toMatchObject({
      variant: 'h1',
      component: 'p',
      align: 'center',
      children: 'GraphiChat',
    });
  });
});
