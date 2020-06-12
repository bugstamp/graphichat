import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { ContactsFooterStyled } from './styled';

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
