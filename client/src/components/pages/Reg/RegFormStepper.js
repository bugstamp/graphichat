import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';

import StepLabelIcon from './StepLabelIcon';
import { StepLabelStyled as StepLabel } from './styled';

export const steps = [
  'Create your account',
  'Tell us about yourself',
];

const RegFormStepper = ({ activeStep }) => (
  <Stepper alternativeLabel activeStep={activeStep}>
    {
      map(steps, (label, index) => {
        const step = index + 1;
        const isActive = activeStep === index;
        const isCompleted = index < activeStep;
        const iconColor = (!isCompleted && !isActive)
          ? 'disabled'
          : 'primary';

        return (
          <Step
            key={index}
            active={isActive}
            completed={isCompleted}
          >
            <StepLabel
              icon={(
                <StepLabelIcon
                  isCompleted={isCompleted}
                  step={step}
                  iconColor={iconColor}
                />
              )}
            >
              <span className="step">{`Step ${step}.`}</span>
              <p>{label}</p>
            </StepLabel>
          </Step>
        );
      })
    }
  </Stepper>
);

RegFormStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export { RegFormStepper };

export default memo(RegFormStepper);
