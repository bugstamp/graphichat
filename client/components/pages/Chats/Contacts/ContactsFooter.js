import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing } from '../../../../styles';

const ContactsFooterStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(2)};

  button {
    width: 75%;
  }
`;

const ContactsFooter = ({ toggleSearchDialog }) => {
  return (
    <ContactsFooterStyled>
      <Button
        color="primary"
        variant="contained"
        size="medium"
        onClick={toggleSearchDialog}
      >
        <AddIcon />
        Chat
      </Button>
    </ContactsFooterStyled>
  );
};

ContactsFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactsFooter;
