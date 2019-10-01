import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  flex: 1 auto;
  display: flex;
  position: relative;
`;

const LoginLayout = ({ children }) => (
  <LayoutWrapper>
    {children}
  </LayoutWrapper>
);

LoginLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(LoginLayout);
