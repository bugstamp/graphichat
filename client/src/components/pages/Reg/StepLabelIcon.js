import React from 'react';
import PropTypes from 'prop-types';

import AccountCircleIcon from '@material-ui/icons/AccountCircleRounded';
import InfoIcon from '@material-ui/icons/InfoRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';

const StepLabelIcon = ({ isCompleted, step, iconColor }) => (
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
);

StepLabelIcon.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default StepLabelIcon;
