import React from 'react';
import PropTypes from 'prop-types';

import { EmptyChatListStyled } from './styled';

const EmptyChatList = ({ searchValue }) => (
  <EmptyChatListStyled variant="subtitle2">
    <Choose>
      <When condition={!searchValue}>
        <p>Your chat list is empty.</p>
      </When>
      <Otherwise>
        {null}
      </Otherwise>
    </Choose>
  </EmptyChatListStyled>
);

EmptyChatList.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default EmptyChatList;
