import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import { getStyledProps } from '../../../styles';

export const ListItemAvatarStyled = styled.div`
  display: flex;
`;

const AvatarWrapper = styled.div`
  flex: 0 0 auto;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
`;

const AvatarBadge = styled(Badge)`
  &&
  {
    span {
      background-color: ${getStyledProps('theme.palette.success.main')};
    }
  }
`;

const ListItemAvatar = (props) => {
  const {
    online,
    src,
    alt,
    text,
  } = props;

  return (
    <ListItemAvatarStyled>
      <AvatarBadge
        color="secondary"
        overlap="circle"
        variant="dot"
        invisible={!online}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <AvatarWrapper>
          <Avatar src={src} alt={alt}>
            {text}
          </Avatar>
        </AvatarWrapper>
      </AvatarBadge>
    </ListItemAvatarStyled>
  );
};

ListItemAvatar.defaultProps = {
  online: false,
  src: '',
  alt: '',
  text: '',
};
ListItemAvatar.propTypes = {
  online: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
};

export default ListItemAvatar;
