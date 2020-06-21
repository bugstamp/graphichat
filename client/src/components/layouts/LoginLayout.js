import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';

import Notification from '../notification';

const LayoutWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  position: relative;
`;

const LoginLayout = ({ children }) => (
  <LayoutWrapper>
    {children}
    <Notification />
  </LayoutWrapper>
);

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(LoginLayout);
