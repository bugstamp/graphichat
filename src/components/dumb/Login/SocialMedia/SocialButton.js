import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Fab from '@material-ui/core/Fab';

export const Button = styled(Fab)`
  && {
    color: #fff;
  }
`;

const SocialButton = ({ loading, onClick, icon }) => (
  <Button disabled={loading} size="small" onClick={onClick} component={Fab}>
    <FontAwesomeIcon icon={icon} size="lg" />
  </Button>
);

export default SocialButton;
