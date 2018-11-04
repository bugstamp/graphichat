import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  && svg {
    color: #000;
  }
`;

const Spinner = () => (
  <SpinnerWrapper>
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </SpinnerWrapper>
);

export default Spinner;
