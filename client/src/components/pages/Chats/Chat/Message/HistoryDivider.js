import React from 'react';
import PropTypes from 'prop-types';

import { messageDateParsers } from '../../../../../helpers';
import { HistoryDividerStyled } from './styled';

const HistoryDivider = ({ time }) => {
  const parsedTime = messageDateParsers.messageHistoryDate(time);

  return (
    <HistoryDividerStyled>
      <p />
      <span>{parsedTime}</span>
      <p />
    </HistoryDividerStyled>
  );
};

HistoryDivider.propTypes = {
  time: PropTypes.string.isRequired,
};

export default HistoryDivider;
