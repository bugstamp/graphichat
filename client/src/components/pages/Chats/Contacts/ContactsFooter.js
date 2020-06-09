import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing } from '../../../../styles';

const ContactsFooterStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(2)} ${getSpacing(1)};

  && {
    button {
      width: 50%;
    }
  }
`;

const ContactsFooter = ({ toggleSearchDialog }) => {
  return (
    <ContactsFooterStyled>
      <Fab
        color="primary"
        variant="extended"
        size="medium"
        onClick={toggleSearchDialog}
      >
        <AddIcon />
        Chat
      </Fab>
    </ContactsFooterStyled>
  );
};

ContactsFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactsFooter;
