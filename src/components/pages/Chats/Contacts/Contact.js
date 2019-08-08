import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { position } from 'polished';

import MaterialListItem from '@material-ui/core/ListItem';
// import red from '@material-ui/core/colors/red';

import ListItemAvatar from '../../../common/List/ListItemAvatar';
import ListItemInfo from '../../../common/List/ListItemInfo';

import { getStyledProps, getSpacing } from '../../../../styles';

const ListItem = styled(({ isSelected, ...rest }) => <MaterialListItem {...rest} />)`
  && {
    margin: 10px;
    padding-right: 60px;
    padding-left: ${getSpacing(1)};
    ${({ isSelected }) => isSelected && `
      background-color: #fff;
      border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')};
    `};

    &&:hover {
      background-color: #fff;
      border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')};
      cursor: pointer;
    }
  }
`;

const SecondaryInfo = styled.div`
  width: 60px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-between;
  ${position('absolute', 0, 0, 0, null)};
  color: ${getStyledProps('theme.palette.grey.700')};
  padding: 11px;
  padding-left: 0;
`;

const Time = styled.span`
  width: 100%;
  font-size: 11px;
  text-align: right;
`;

// const Badge = styled.div`
//   min-width: 21px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 5px;
//   font-size: 11px;
//   color: #fff;
//   background-color: ${red[500]};
//   border-radius: 50%;
// `;

const Contact = ({
  displayName,
  message,
  avatar,
  online,
  time,
  isSelected,
  onSelect,
}) => {
  const { src, text } = avatar;

  return (
    <ListItem isSelected={isSelected} onClick={onSelect}>
      <ListItemAvatar src={src} text={text} online={online} />
      <ListItemInfo primary={displayName} secondary={message} />
      <SecondaryInfo>
        <Time>{time}</Time>
      </SecondaryInfo>
    </ListItem>
  );
};

Contact.propTypes = {
  displayName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  avatar: PropTypes.shape({
    src: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  online: PropTypes.bool.isRequired,
  time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Contact;
