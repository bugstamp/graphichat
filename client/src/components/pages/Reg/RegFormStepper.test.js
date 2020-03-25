import React from 'react';
import { shallow } from 'enzyme';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';

import { RegFormStepper, steps } from './RegFormStepper';
import StepLabelIcon from './StepLabelIcon';
import { StepLabelStyled as StepLabel } from './styled';

import { mountMockedProvider } from '../../../__mocks__/mockedProvider';

describe('RegFormStepper', () => {
  let activeStep = 0;
  const mountWrapper = () => mountMockedProvider(<RegFormStepper activeStep={activeStep} />);

  test('should match to snapshot', () => {
    expect(shallow(<RegFormStepper activeStep={0} />)).toMatchSnapshot();
  });
  test('should mount without errors', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(RegFormStepper)).toHaveLength(1);
  });
  test('should have Stepper with correct props', () => {
    const wrapper = mountWrapper();

    expect(wrapper.find(Stepper)).toHaveLength(1);
    expect(wrapper.find(Stepper).props()).toMatchObject({
      alternativeLabel: true,
      activeStep,
    });
  });
  describe('Step', () => {
    test('paragraph text should be matched to steps array', () => {
      const wrapper = mountWrapper();
      const paragraphs = wrapper.find(Step).find('p');

      expect(wrapper.find(Step)).toHaveLength(steps.length);

      paragraphs.forEach((p, index) => {
        expect(p.text()).toEqual(steps[index]);
      });
    });
    test('active Step props', () => {
      const wrapper = mountWrapper();
      const ActiveStepWrapper = wrapper.find(Step).at(activeStep);

      expect(ActiveStepWrapper).toHaveLength(1);
      expect(ActiveStepWrapper.props()).toMatchObject({
        active: true,
        completed: false,
      });
    });
    test('inactive Step props', () => {
      const wrapper = mountWrapper();
      const InactiveStepWrapper = wrapper.find(Step).at(activeStep + 1);

      expect(InactiveStepWrapper).toHaveLength(1);
      expect(InactiveStepWrapper.props()).toMatchObject({
        active: false,
        completed: false,
      });
    });
    test('active StepLabel props', () => {
      const wrapper = mountWrapper();
      const ActiveStepWrapper = wrapper.find(Step).at(activeStep);
      const ActiveStepLabelWrapper = ActiveStepWrapper.find(StepLabel);

      expect(ActiveStepLabelWrapper).toHaveLength(1);
      expect(ActiveStepLabelWrapper.find(StepLabelIcon).props()).toMatchObject({
        isCompleted: false,
        step: activeStep + 1,
        iconColor: 'primary',
      });
      expect(ActiveStepLabelWrapper.find('span.step').text()).toMatch(`Step ${activeStep + 1}.`);
      expect(ActiveStepLabelWrapper.find('p').text()).toEqual(steps[activeStep]);
    });
    test('completed prop should be true in the passed steps', () => {
      activeStep = 1;
      const wrapper = mountWrapper();
      const PassedStepWrapper = wrapper.find(Step).at(0);

      expect(PassedStepWrapper).toHaveLength(1);
      expect(PassedStepWrapper.props()).toMatchObject({
        active: false,
        completed: true,
      });
    });
  });
});
