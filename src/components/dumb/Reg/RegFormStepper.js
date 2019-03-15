import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import styled from 'styled-components';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import InfoIcon from '@material-ui/icons/InfoRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';

const StepLabelStyled = styled(StepLabel)`
  p {
    width: 100%;
  }
`;

const RegFormStepper = ({ activeStep, steps }) => (
  <Stepper alternativeLabel activeStep={activeStep}>
    {
      map(steps, (label, index) => {
        const isActive = activeStep === index;
        const isCompleted = index < activeStep;
        const iconColor = (!isCompleted && !isActive)
          ? 'disabled'
          : 'primary';
        const step = index + 1;

        return (
          <Step
            key={index}
            active={isActive}
            completed={isCompleted}
          >
            <StepLabelStyled
              icon={(
                <Choose>
                  <When condition={isCompleted}>
                    <CheckCircleIcon color={iconColor} />
                  </When>
                  <When condition={step === 1}>
                    <AccountCircleIcon color={iconColor} />
                  </When>
                  <Otherwise>
                    <InfoIcon color={iconColor} />
                  </Otherwise>
                </Choose>
              )}
            >
              <span>{`Step ${step}.`}</span>
              <p>{label}</p>
            </StepLabelStyled>
          </Step>
        );
      })
    }
  </Stepper>
);

export default RegFormStepper;
