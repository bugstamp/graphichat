import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing } from '../../../../styles';

const ListPanelFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${getSpacing(1)} 0;
`;

const ContactPanelFooter = ({ toggleSearchDialog }) => {
  return (
    <ListPanelFooter>
      <Fab color="primary" size="medium" onClick={toggleSearchDialog}>
        <AddIcon />
      </Fab>
    </ListPanelFooter>
  );
};

ContactPanelFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactPanelFooter;
