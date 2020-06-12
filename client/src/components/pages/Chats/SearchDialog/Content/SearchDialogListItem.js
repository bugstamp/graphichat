import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import {} from 'polished';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/DoneRounded';

import ListItem from '../../../../common/List/ListItem';
import ListItemAvatar from '../../../../common/List/ListItemAvatar';
import ListItemInfo from '../../../../common/List/ListItemInfo';

import { userAvatarProps } from '../../../../propTypes';

const SearchDialogListItem = (props) => {
  const {
    avatar,
    displayName,
    username,
    isAdding,
    isAdded,
    onClick,
  } = props;

  return (
    <ListItem>
      <ListItemAvatar {...avatar} online={false} />
      <ListItemInfo primary={displayName} secondary={username} />
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={onClick}
        disabled={isAdded}
      >
        <Choose>
          <When condition={isAdding}>
            <CircularProgress size={20} color="inherit" />
          </When>
          <When condition={isAdded}>
            <DoneIcon />
          </When>
          <Otherwise>
            Add
          </Otherwise>
        </Choose>
      </Button>
    </ListItem>
  );
};

SearchDialogListItem.propTypes = {
  avatar: PropTypes.shape(userAvatarProps).isRequired,
  displayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isAdding: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchDialogListItem;
