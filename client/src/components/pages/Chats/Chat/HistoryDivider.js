import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { messageDateParsers } from '../../../../helpers';
import { getStyledProps, getSpacing } from '../../../../styles';

const HistoryDividerStyled = styled.div`
  --historyDividerColor: ${getStyledProps('theme.palette.common.black')};
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin: ${getSpacing(1)} 0;

  p {
    height: 1px;
    flex: 1 auto;
    display: inline-flex;
    background-color: var(--historyDividerColor);
    border-radius: 2px;
  }

  span {
    padding: 0 ${getSpacing(2)};
    color: var(--historyDividerColor);
  }
`;

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
