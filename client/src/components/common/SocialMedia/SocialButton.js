import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SocialButton as Button } from './styled';

const SocialButton = ({ loading, icon, onClick }) => (
  <Button disabled={loading} size="small" onClick={onClick}>
    <FontAwesomeIcon icon={icon} size="lg" />
  </Button>
);

SocialButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SocialButton;
