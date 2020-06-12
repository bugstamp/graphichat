import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/AddRounded';

import SearchBox from '../../../../common/SearchBox';

import { ContactsHeaderStyled, ContactsHeaderTitle, AddButton } from './styled';

const ContactsHeader = (props) => {
  const {
    title,
    searchValue,
    onChangeSearchValue,
    toggleSearchDialog,
  } = props;

  return (
    <ContactsHeaderStyled>
      <ContactsHeaderTitle>
        <Typography variant="h6" align="center" color="textPrimary">
          {title}
        </Typography>
        <Hidden mdUp implementation="css">
          <AddButton onClick={toggleSearchDialog} color="primary">
            <AddIcon />
          </AddButton>
        </Hidden>
      </ContactsHeaderTitle>
      <SearchBox value={searchValue} onChange={onChangeSearchValue} />
    </ContactsHeaderStyled>
  );
};

ContactsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ContactsHeader;
