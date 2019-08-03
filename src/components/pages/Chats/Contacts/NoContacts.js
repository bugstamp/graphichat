import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MaterialTypography from '@material-ui/core/Typography';

const Typography = styled(MaterialTypography)`
  && {
    p {
      text-align: center;
    }
  }
`;

const NoContacts = ({ searchValue }) => (
  <Typography variant="subtitle2">
    <Choose>
      <When condition={!searchValue}>
        <p>Your contact list is empty.</p>
        <p>Click on the "add contact" button to find your contacts</p>
      </When>
      <Otherwise>
        {null}
      </Otherwise>
    </Choose>
  </Typography>
);

NoContacts.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default NoContacts;
