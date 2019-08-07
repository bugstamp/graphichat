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
        <p>Your chat list is empty.</p>
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
