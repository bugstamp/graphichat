import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing } from '../../../../styles';

const ListPanelFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(1)} ${getSpacing(4)};

  button {
    width: 100%;
  }
`;

const ContactPanelFooter = ({ toggleSearchDialog }) => {
  return (
    <ListPanelFooter>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={toggleSearchDialog}
      >
        <AddIcon />
        Add Contact
      </Button>
    </ListPanelFooter>
  );
};

ContactPanelFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactPanelFooter;
