import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';

import LoginPresentation from './LoginPresentation';
import { SubTitle } from './styled';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';

describe('LoginPresentation', () => {
  const stopAnimation = false;
  const toggleFormMock = jest.fn();

  const LoginPresentationMock = (
    <LoginPresentation
      stopAnimation={stopAnimation}
      toggleForm={toggleFormMock}
    />
  );
  const mountWrapper = () => mountMockedProvider(LoginPresentationMock);

  test('should match to snapshot', () => {
    const wrapper = shallow(LoginPresentationMock);

    expect(wrapper).toMatchSnapshot();
  });
  test('mount should be without errors', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(LoginPresentation)).toHaveLength(1);
  });
  test('passed props should be match', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(LoginPresentation).prop('stopAnimation')).toBe(stopAnimation);
    expect(wrapper.find(LoginPresentation).prop('toggleForm')).toBe(toggleFormMock);
  });
  test('should have BrandTitle', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find('BrandTitle')).toHaveLength(1);
  });

  describe('SubTitle', () => {
    const wrapper = mountWrapper();
    const SubTitleWrapper = wrapper.find(SubTitle);

    it('should have stopAnimation prop', () => {
      expect(SubTitleWrapper.prop('stopAnimation')).toBe(stopAnimation);
    });
    it('should have button with onClick prop', () => {
      expect(SubTitleWrapper.find('button')).toHaveLength(1);
      expect(SubTitleWrapper.find('button').prop('onClick')).toBe(toggleFormMock);
    });
    it('should have two headers with correct props', () => {
      const headers = SubTitleWrapper.find(Typography);

      expect(headers).toHaveLength(2);
      expect(SubTitleWrapper.find(Typography).first().props()).toMatchObject({
        component: 'p',
        variant: 'h4',
        align: 'center',
        paragraph: true,
        children: 'A lightweight, simple and useful web chat app based on the modern GraphQL API',
      });
      expect(SubTitleWrapper.find(Typography).last().props()).toMatchObject({
        component: 'p',
        variant: 'h4',
        align: 'center',
        children: 'Try it now!',
      });
    });
  });
});
