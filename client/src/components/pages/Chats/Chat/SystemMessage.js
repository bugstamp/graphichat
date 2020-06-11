import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getStyledProps, getSpacing } from '../../../../styles';

const SystemMessageStyled = styled.div`
  --systemMessageColor: ${getStyledProps('theme.palette.secondary.light')};
  padding: ${getSpacing(1)};
  color: #fff;
  background-color: var(--systemMessageColor);
  border-radius: 10px;
`;

const SystemMessage = ({ content }) => (
  <SystemMessageStyled>
    <p>{content}</p>
  </SystemMessageStyled>
);

SystemMessage.propTypes = {
  content: PropTypes.string.isRequired,
};

export default SystemMessage;
