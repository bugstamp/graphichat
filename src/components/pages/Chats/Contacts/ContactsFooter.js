import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddRounded';

import { getSpacing, getStyledProps } from '../../../../styles';

const ListPanelFooter = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: 75%;

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const xsDown = breakpoints.down('xs');

    return `
      ${xsDown} {
        width: 100%;
      }
    `;
  }}
  }
`;

const ContactPanelFooter = ({ toggleSearchDialog }) => {
  return (
    <ListPanelFooter>
      <Button
        color="primary"
        variant="contained"
        size="small"
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
