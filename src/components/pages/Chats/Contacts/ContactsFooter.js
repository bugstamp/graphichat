import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getSpacing, getStyledProps } from '../../../../styles';

const ContactsFooterStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(2)};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const smDown = breakpoints.down('sm');
    const mdUp = breakpoints.up('md');

    return `
      ${mdUp} {
        button {
          width: 75%;
        }
      }
      ${smDown} {
        justify-content: flex-end;
      }
    `;
  }}
`;

const ContactsFooter = ({ toggleSearchDialog }) => {
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const color = 'primary';

  return (
    <ContactsFooterStyled>
      <Choose>
        <When condition={smDown}>
          <Fab
            color={color}
            size="medium"
          >
            <AddIcon />
          </Fab>
        </When>
        <Otherwise>
          <Button
            color={color}
            variant="contained"
            size="medium"
            onClick={toggleSearchDialog}
          >
            <AddIcon />
            Chat
          </Button>
        </Otherwise>
      </Choose>
    </ContactsFooterStyled>
  );
};

ContactsFooter.propTypes = {
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactsFooter;
