import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/AddRounded';

import SearchBox from '../../../common/SearchBox';

import { getSpacing } from '../../../../styles';

const ContactsHeaderStyled = styled.div`
  display: flex;
  flex-flow: column;
  padding: ${getSpacing(2)} ${getSpacing(1)};
`;

const AddButton = styled(IconButton)`
  && {
    ${position('absolute', 0, 0, null, null)};
    padding: ${getSpacing(0.5)};
  }
`;

const ContactsHeaderTitle = styled.div`
  position: relative;
  margin-bottom: ${getSpacing(1)};
`;

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
