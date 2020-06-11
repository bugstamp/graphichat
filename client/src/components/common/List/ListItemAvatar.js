import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size, position } from 'polished';

import Avatar from '@material-ui/core/Avatar';

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

const AvatarIndicator = styled.span`
  ${position('absolute', null, '0px', '15px', null)};
  ${size('10px')};
  display: block;
  background-color: ${getStyledProps('theme.palette.success.main')};
  border-radius: 50%;
  visibility: ${({ online }) => !online && 'hidden'};
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
      <AvatarWrapper>
        <Avatar src={src} alt={alt}>
          {text}
        </Avatar>
        <AvatarIndicator online={online} />
      </AvatarWrapper>
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
