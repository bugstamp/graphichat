import React from 'react';
import PropTypes from 'prop-types';

import { messageDateParsers } from '../../../../../helpers';
import { HistoryDividerStyled } from './styled';

const HistoryDivider = ({ time }) => {
  console.log(typeof time);
  console.log(time);
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
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
};

export default HistoryDivider;
