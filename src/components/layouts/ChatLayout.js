import React from 'react';
// import PropTypes from 'prop-types';

import LayoutWrapper from './LayoutWrapper';

const ChatLayout = ({ children }) => (
  <LayoutWrapper>
    {children}
  </LayoutWrapper>
);

ChatLayout.propTypes = {};

export default ChatLayout;
