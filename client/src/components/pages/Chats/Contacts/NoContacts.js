import React from 'react';
import PropTypes from 'prop-types';

import { NoContactsStyled } from './styled';

const NoContacts = ({ searchValue }) => (
  <NoContactsStyled variant="subtitle2">
    <Choose>
      <When condition={!searchValue}>
        <p>Your chat list is empty.</p>
      </When>
      <Otherwise>
        {null}
      </Otherwise>
    </Choose>
  </NoContactsStyled>
);

NoContacts.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default NoContacts;
