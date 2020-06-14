import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/AddRounded';

import SearchBox from '../../../../common/SearchBox/SearchBox';

import { ChatListHeaderStyled, HeaderTitle, AddButton } from './styled';

const ChatListHeader = (props) => {
  const {
    title,
    searchValue,
    onChangeSearchValue,
    toggleSearchDialog,
  } = props;

  return (
    <ChatListHeaderStyled>
      <HeaderTitle>
        <Typography variant="h6" align="center" color="textPrimary">
          {title}
        </Typography>
        <Hidden mdUp implementation="css">
          <AddButton onClick={toggleSearchDialog} color="primary">
            <AddIcon />
          </AddButton>
        </Hidden>
      </HeaderTitle>
      <SearchBox value={searchValue} onChange={onChangeSearchValue} />
    </ChatListHeaderStyled>
  );
};

ChatListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  toggleSearchDialog: PropTypes.func.isRequired,
};

export default ChatListHeader;
