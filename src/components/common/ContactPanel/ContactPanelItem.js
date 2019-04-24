import React from 'react';
import styled from 'styled-components';
import { position } from 'polished';
import { isEmpty } from 'lodash';

import ListItem from '@material-ui/core/ListItem';
import red from '@material-ui/core/colors/red';

import AppListItemAvatar from './AppList/ListItemAvatar';
import AppListItemInfo from './AppList/ListItemInfo';

import { getStyledProps, getSpacing } from '../../../styles';
import { getContactInitials } from '../../../helpers';

const ContactListItem = styled(ListItem)`
  && {
    padding-right: 60px;
    padding-left: ${getSpacing(1)};

    &&:hover {
      background-color: #fff;
      border-radius: ${getStyledProps('theme.shape.borderRadius', 'px')};
      cursor: pointer;
    }
  }
`;

const ContactItemSecondary = styled.div`
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

const ContactItemTime = styled.span`
  width: 100%;
  font-size: 11px;
  text-align: right;
  text-transform: uppercase;
`;

const ContactItemBadge = styled.div`
  min-width: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 11px;
  color: #fff;
  background-color: ${red[500]};
  border-radius: 50%;
`;

const ContactPanelItem = ({
  contact,
  message,
}) => {
  const {
    displayName,
    firstName,
    lastName,
    status,
  } = contact;
  const avatarText = getContactInitials(firstName, lastName);
  const online = status === 'ONLINE';

  return (
    <ContactListItem>
      <AppListItemAvatar src={null} text={avatarText} online={online} />
      <AppListItemInfo primary={displayName} secondary={message} />
      <ContactItemSecondary>
        <If condition={!isEmpty(message)}>
          <ContactItemTime>{message.time}</ContactItemTime>
          {/* <ContactItemBadge>{}</ContactItemBadge> */}
        </If>
      </ContactItemSecondary>
    </ContactListItem>
  );
};

export default ContactPanelItem;
