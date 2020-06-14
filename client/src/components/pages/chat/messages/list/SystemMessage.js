import React from 'react';
import PropTypes from 'prop-types';

import { SystemMessageStyled } from './styled';

const SystemMessage = ({ content }) => (
  <SystemMessageStyled>
    <p>{content}</p>
  </SystemMessageStyled>
);

SystemMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default SystemMessage;
