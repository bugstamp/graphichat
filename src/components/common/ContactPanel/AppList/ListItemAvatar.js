import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { size, position } from 'polished';

import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';

// import { getStyledProps, getSpacing } from '../../../../styles';

const Wrapper = styled.div`
  position: relative;
  border-radius: 50%;
`;

const AvatarIndicator = styled.span`
  ${position('absolute', null, '2px', '2px', null)};
  ${size('10px')};
  display: block;
  background-color: ${green[500]};
  border-radius: 50%;
`;

const ListItemAvatar = ({
  online,
  src,
  alt,
  text,
}) => (
  <Wrapper>
    <Choose>
      <When condition={src}>
        <Avatar src={src} alt={alt || text} />
      </When>
      <Otherwise>
        <Avatar>{text}</Avatar>
      </Otherwise>
    </Choose>
    <If condition={online}>
      <AvatarIndicator />
    </If>
  </Wrapper>
);

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
